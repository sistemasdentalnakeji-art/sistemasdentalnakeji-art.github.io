// ─────────────────────────────────────────────────────────────────────────────
// SHADERS PARA MUCHOS LIENZOS (tarjetas del equipo en /nosotros/): la aurora del hero detrás de cada foto y los hilos de
// luz del footer en cada reverso.
//
// Un WebGL por lienzo pasaría el límite del navegador (~16 contextos), así que cada efecto usa un solo contexto fuera de
// la página que dibuja cada lienzo registrado, con su propio tiempo, y lo copia a su lienzo 2D. Así cada tarjeta tiene
// la composición completa (el mismo diseño en todas) y su propia animación. Mismos shaders y colores que AuroraBackground.
// • El primer cuadro se pinta al registrar el lienzo (nada aparece vacío).
// • 30 fps como máximo. Se detiene con la pestaña oculta, con "reducir movimiento" y con "Pausar animaciones" (queda el
//   último cuadro), y no pinta los lienzos fuera de pantalla.
// Al cargar el módulo solo se crean funciones: el WebGL se crea con el primer lienzo (nada corre al prerenderizar en Node).
// ─────────────────────────────────────────────────────────────────────────────

import { AURORA_PALETTES, compileShader, FIBERS_FRAGMENT, FRAGMENT, toRgb, VERTEX } from '@/components/decor/auroraShaders'

const RENDER_SCALE = 0.5
const FRAME_INTERVAL = 1000 / 30

interface PoolOptions {
  fragment: string
  /** Solo para los hilos de luz. */
  fiberCount?: number
  /** Multiplica la velocidad (1 = la del hero / footer). */
  speed?: number
}

interface Target {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  /** Segundos de desfase: cada lienzo va en otro punto de la animación. */
  offset: number
  onScreen: boolean
}

interface Renderer {
  gl: WebGLRenderingContext
  canvas: HTMLCanvasElement
  uTime: WebGLUniformLocation | null
  uResolution: WebGLUniformLocation | null
}

function createRenderer({ fragment: source, fiberCount = 14 }: PoolOptions): Renderer | null {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
  if (!gl) return null
  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX)
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, source)
  const program = gl.createProgram()
  if (!vertex || !fragment || !program) return null
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  // Un triángulo que cubre todo el lienzo.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const uniform = (name: string) => gl.getUniformLocation(program, name)
  const palette = AURORA_PALETTES.dark
  gl.uniform3fv(uniform('uBase'), toRgb(palette.base))
  gl.uniform3fv(uniform('uColorA'), toRgb(palette.colors[0]))
  gl.uniform3fv(uniform('uColorB'), toRgb(palette.colors[1]))
  gl.uniform3fv(uniform('uColorC'), toRgb(palette.colors[2]))
  gl.uniform1f(uniform('uIntensity'), palette.intensity)
  gl.uniform1f(uniform('uFiberCount'), fiberCount) // la aurora no lo usa: WebGL ignora un uniform inexistente
  return { gl, canvas, uTime: uniform('uTime'), uResolution: uniform('uResolution') }
}

/** Crea un efecto compartido. Devuelve la función que registra un lienzo (y que a su vez devuelve la que lo da de baja). */
function createPool(options: PoolOptions) {
  const speed = options.speed ?? 1
  const targets = new Set<Target>()
  // undefined: aún no se crea · null: no hay WebGL (los lienzos se quedan con el fondo CSS de respaldo).
  let renderer: Renderer | null | undefined
  let observer: IntersectionObserver | null = null
  let reduceMotion: MediaQueryList | null = null
  let frame = 0
  let lastDraw = 0
  let startedAt = 0

  const seconds = (now: number) => ((now - startedAt) / 1000) * speed

  function paint(target: Target, time: number) {
    // Si el navegador perdió el contexto (reinicio de la GPU, equipo suspendido) se crea otro: el programa y el búfer
    // se perdieron con él. shortcut: si en ese momento no se puede crear, los lienzos quedan con su fondo hasta recargar.
    if (renderer?.gl.isContextLost()) renderer = createRenderer(options)
    if (!renderer) return
    const { gl, canvas } = renderer
    const width = Math.max(1, Math.round(target.canvas.clientWidth * RENDER_SCALE))
    const height = Math.max(1, Math.round(target.canvas.clientHeight * RENDER_SCALE))
    if (target.canvas.width !== width || target.canvas.height !== height) {
      target.canvas.width = width
      target.canvas.height = height
    }
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }
    gl.uniform2f(renderer.uResolution, width, height)
    gl.uniform1f(renderer.uTime, 14 + target.offset + time)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    // Se copia en la misma tarea en que se dibujó: el búfer de WebGL sigue válido aunque no se conserve.
    target.context.drawImage(canvas, 0, 0)
    target.canvas.classList.add('is-ready')
  }

  function loop(now: number) {
    frame = requestAnimationFrame(loop)
    if (now - lastDraw < FRAME_INTERVAL) return
    lastDraw = now
    for (const target of targets) if (target.onScreen) paint(target, seconds(now))
  }

  function update() {
    const paused = reduceMotion?.matches || document.documentElement.dataset.motion === 'paused' || document.hidden
    const play = targets.size > 0 && !paused
    if (play && !frame) frame = requestAnimationFrame(loop)
    if (!play && frame) {
      cancelAnimationFrame(frame)
      frame = 0
    }
  }

  function listen(on: boolean) {
    reduceMotion ??= window.matchMedia('(prefers-reduced-motion: reduce)')
    const method = on ? 'addEventListener' : 'removeEventListener'
    document[method]('visibilitychange', update)
    reduceMotion[method]('change', update)
    window[method]('motionchange', update)
  }

  return function add(canvas: HTMLCanvasElement, offset: number): () => void {
    if (renderer === undefined) {
      renderer = createRenderer(options)
      startedAt = performance.now()
    }
    const context = canvas.getContext('2d')
    if (!renderer || !context) return () => {}

    const target: Target = { canvas, context, offset, onScreen: true }
    targets.add(target)
    observer ??= new IntersectionObserver((entries) => {
      for (const entry of entries) {
        for (const item of targets) if (item.canvas === entry.target) item.onScreen = entry.isIntersecting
      }
    })
    observer.observe(canvas)
    paint(target, seconds(performance.now()))
    if (targets.size === 1) listen(true)
    update()

    return () => {
      targets.delete(target)
      observer?.unobserve(canvas)
      if (targets.size === 0) listen(false)
      update()
    }
  }
}

/** Aurora del hero (detrás de la foto): 4× más rápida, porque en una ventana chica a su velocidad parece un color fijo. */
export const addAurora = createPool({ fragment: FRAGMENT, speed: 4 })

/** Hilos de luz del footer (reverso de la tarjeta). */
export const addFibers = createPool({ fragment: FIBERS_FRAGMENT, fiberCount: 8 })
