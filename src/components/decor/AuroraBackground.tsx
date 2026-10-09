import { useEffect, useRef, useState } from 'react'
import { FIBERS_FRAGMENT, FRAGMENT, VERTEX } from '@/components/decor/auroraShaders'

// Fondo "aurora" en WebGL (GLSL propio, sin dependencias).
// - Se dibuja a baja resolución (es un degradado suave) y a 30 fps como máximo.
// - Se pausa fuera de pantalla, con la pestaña oculta y con "reducir movimiento".
// - Si no hay WebGL, falla el dibujo o Chrome pierde la tarjeta gráfica, queda el degradado CSS
//   de la sección (nunca un rectángulo negro): el lienzo es transparente hasta que se pinta y solo
//   se muestra (.is-ready) después de comprobar que el primer cuadro sí se dibujó.

export type AuroraTheme = 'dark' | 'light'
/** aurora: luces difusas (hero) · fibers: hilos de luz (footer). */
export type AuroraEffect = 'aurora' | 'fibers'

const SHADERS: Record<AuroraEffect, string> = { aurora: FRAGMENT, fibers: FIBERS_FRAGMENT }

const PALETTES: Record<AuroraTheme, { base: string; colors: [string, string, string]; intensity: number }> = {
  // Azules del logo + un toque aguamarina (fresco, "dental").
  dark: { base: '#0a1529', colors: ['#2f63ad', '#7bc3eb', '#3fb5c8'], intensity: 0.85 },
  light: { base: '#f5f7fb', colors: ['#b7d3f2', '#7bc3eb', '#ade4ea'], intensity: 0.85 },
}

const RENDER_SCALE = 0.45
const FRAME_INTERVAL = 1000 / 30

const toRgb = (hex: string): [number, number, number] => {
  const value = parseInt(hex.slice(1), 16)
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255]
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('Aurora: error al compilar el shader', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

interface AuroraBackgroundProps {
  theme: AuroraTheme
  effect?: AuroraEffect
  className?: string
}

export function AuroraBackground({ theme, effect = 'aurora', className }: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Sube cuando Chrome restaura el contexto gráfico: vuelve a montar la aurora desde cero.
  const [generation, setGeneration] = useState(0)
  // El footer (hilos de luz) está muy abajo: su WebGL no se inicia hasta que el visitante se acerca,
  // para no gastar tiempo de carga (compilar shaders y leer píxeles) en algo que aún no se ve.
  const [armed, setArmed] = useState(effect !== 'fibers')

  useEffect(() => {
    if (armed) return
    const canvas = canvasRef.current
    if (!canvas) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setArmed(true)
      },
      { rootMargin: '800px 0px' },
    )
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [armed])

  useEffect(() => {
    if (!armed) return
    const canvas = canvasRef.current
    // alpha: true → si algo no se pinta, se ve el degradado CSS de atrás y no negro.
    // Sin powerPreference: 'low-power', que da lienzos negros con algunos drivers (equipos con 2 GPU).
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: false, preserveDrawingBuffer: false })
    if (!canvas || !gl || gl.isContextLost()) return

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, SHADERS[effect])
    const program = gl.createProgram()
    // Si algo falla a mitad, se liberan los recursos ya creados (shaders y programa).
    const release = () => {
      if (program) gl.deleteProgram(program)
      if (vertex) gl.deleteShader(vertex)
      if (fragment) gl.deleteShader(fragment)
    }
    if (!vertex || !fragment || !program) return release()
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return release()
    gl.useProgram(program)

    // Un triángulo que cubre toda la pantalla.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uniform = (name: string) => gl.getUniformLocation(program, name)
    const palette = PALETTES[theme]
    gl.uniform3fv(uniform('uBase'), toRgb(palette.base))
    gl.uniform3fv(uniform('uColorA'), toRgb(palette.colors[0]))
    gl.uniform3fv(uniform('uColorB'), toRgb(palette.colors[1]))
    gl.uniform3fv(uniform('uColorC'), toRgb(palette.colors[2]))
    gl.uniform1f(uniform('uIntensity'), palette.intensity)
    const uTime = uniform('uTime')
    const uResolution = uniform('uResolution')

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const startedAt = performance.now()
    let elapsed = 14 // punto de partida con una composición agradable
    let frame = 0
    let lastDraw = 0
    let onScreen = true

    const draw = () => {
      gl.uniform1f(uTime, elapsed)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    // force: true al iniciar. Cada montaje crea un programa nuevo que aún no conoce el tamaño
    // (en desarrollo React monta dos veces y el lienzo ya tiene el tamaño correcto). Sin esto,
    // uResolution queda en 0×0 y la aurora se pinta negra hasta que cambia el tamaño (p. ej. con zoom).
    const resize = (force = false) => {
      const width = Math.max(1, Math.round(canvas.clientWidth * RENDER_SCALE))
      const height = Math.max(1, Math.round(canvas.clientHeight * RENDER_SCALE))
      if (!force && canvas.width === width && canvas.height === height) return
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
      gl.uniform2f(uResolution, width, height)
      draw()
    }

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (now - lastDraw < FRAME_INTERVAL) return
      lastDraw = now
      elapsed = 14 + (now - startedAt) / 1000
      draw()
    }

    const pause = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }
    let contextLost = false
    const update = () => {
      const paused = reduceMotion.matches || document.documentElement.dataset.motion === 'paused'
      const shouldPlay = !contextLost && onScreen && !document.hidden && !paused
      // Al volver a la pestaña se repinta de inmediato (Chrome puede haber descartado el cuadro).
      if (!contextLost && !document.hidden) draw()
      if (shouldPlay && !frame) frame = requestAnimationFrame(loop)
      if (!shouldPlay) pause()
    }

    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(canvas)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      update()
    })
    visibilityObserver.observe(canvas)
    document.addEventListener('visibilitychange', update)
    reduceMotion.addEventListener('change', update)
    window.addEventListener('motionchange', update)

    // Si Chrome pierde el contexto gráfico: se oculta (queda el degradado CSS) y, cuando lo
    // restaura, la aurora se vuelve a crear.
    const onContextLost = (event: Event) => {
      event.preventDefault() // permite que Chrome lo restaure
      contextLost = true
      pause()
      canvas.classList.remove('is-ready')
    }
    const onContextRestored = () => setGeneration((value) => value + 1)
    canvas.addEventListener('webglcontextlost', onContextLost)
    canvas.addEventListener('webglcontextrestored', onContextRestored)

    resize(true)
    // Comprueba que el primer cuadro sí se pintó (opaco y no negro puro) antes de mostrarlo;
    // si no, se queda el degradado CSS de respaldo.
    const pixel = new Uint8Array(4)
    gl.readPixels(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel)
    if (pixel[3] === 255 && pixel[0] + pixel[1] + pixel[2] > 0) canvas.classList.add('is-ready')
    update()

    return () => {
      pause()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', update)
      reduceMotion.removeEventListener('change', update)
      window.removeEventListener('motionchange', update)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
      gl.deleteBuffer(buffer)
    }
  }, [theme, effect, generation, armed])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
