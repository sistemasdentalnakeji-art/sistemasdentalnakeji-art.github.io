// ─────────────────────────────────────────────────────────────────────────────
// FONDO "PLASMA" (React Bits → Backgrounds → Plasma, con la librería `ogl`)
//
// Ondas de plasma en WebGL 2 (raymarching) teñidas con un color. Se usa detrás del contenido de /servicios/
// (pages/services/ServicesPage.tsx, estilos `.catalog__plasma` en styles/pages/services-index.css) y de /beneficios/
// (pages/benefits/BenefitsPage.tsx, estilos `.benefits__plasma` en styles/pages/benefits.css).
// • Rendimiento: se dibuja a una fracción de la resolución (`renderScale`) y a `targetFps` como máximo.
// • Se pausa fuera de pantalla, con la pestaña oculta, con "reducir movimiento" y con "Pausar animaciones" (footer);
//   en pausa deja un cuadro fijo. Si no hay WebGL 2 no se dibuja nada (queda el fondo de la sección).
// • Debe poder renderizarse en Node (prerender): `ogl` solo se usa dentro de useEffect.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'

const VERTEX = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = (iterations: number) => `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;

  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < ${iterations}.; O += o.w / d * o.xyz) {
    p = z * normalize(vec3(C - .5 * r, r.y));
    p.z -= 4.;
    S = p;
    d = p.y - T;

    p.x += .4 * (1. + p.y) * sin(d + p.x * 0.1) * cos(.34 * d + p.x * 0.05);
    Q = p.xz *= mat2(cos(p.y + vec4(0, 11, 33, 0) - T));
    z += d = abs(sqrt(length(Q * Q)) - .25 * (5. + S.y)) / 3. + 8e-4;
    o = 1. + sin(S.y + p.z * .5 + S.z - length(S - p) + vec4(2, 1, 0, 8));
  }

  o.xyz = tanh(O / 1e4);
}

bool finite1(float x) { return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c) {
  return vec3(finite1(c.r) ? c.r : 0.0, finite1(c.g) ? c.g : 0.0, finite1(c.b) ? c.b : 0.0);
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);

  // Adaptación para fondos CLAROS (el original multiplica el color por la intensidad y está pensado para fondos oscuros):
  // aquí la fuerza del plasma solo decide la transparencia, y el color es el del tema (ogl crea el lienzo SIN alfa
  // premultiplicado, por eso el color sale sin multiplicar por el alfa).
  float alpha = clamp(length(rgb) * uOpacity, 0.0, 1.0);
  vec3 tint = mix(rgb, uCustomColor, step(0.5, uUseCustomColor));
  fragColor = vec4(tint, alpha);
}
`

const hexToRgb = (hex: string): [number, number, number] => {
  const value = parseInt(hex.replace('#', ''), 16)
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255]
}

interface PlasmaBackgroundProps {
  /** Color (hex) con el que se tiñe el plasma. Sin color usa los colores originales. */
  color?: string
  /** Multiplicador de velocidad. */
  speed?: number
  /** Zoom del patrón: más alto = más grande. */
  scale?: number
  /** Opacidad general (0 a 1). */
  opacity?: number
  /** Pasos del raymarching: menos = más barato y menos detallado. */
  iterations?: number
  /** Resolución interna respecto a la pantalla (1 = completa). */
  renderScale?: number
  /** Tope del devicePixelRatio usado al dibujar. */
  maxDpr?: number
  /** Cuadros por segundo máximos. */
  targetFps?: number
  className?: string
}

export function PlasmaBackground({
  color,
  speed = 1,
  scale = 1,
  opacity = 1,
  iterations = 60,
  renderScale = 0.55,
  maxDpr = 1.5,
  targetFps = 60,
  className,
}: PlasmaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer: Renderer
    try {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr) * renderScale
      renderer = new Renderer({ webgl: 2, alpha: true, antialias: false, dpr })
    } catch {
      return
    }
    const gl = renderer.gl
    if (!gl) return
    const canvas = gl.canvas as HTMLCanvasElement
    canvas.style.display = 'block'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    container.appendChild(canvas)

    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: fragment(iterations),
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(color ? hexToRgb(color) : [1, 1, 1]) },
        uUseCustomColor: { value: color ? 1 : 0 },
        uSpeed: { value: speed * 0.4 },
        uDirection: { value: 1 },
        uScale: { value: scale },
        uOpacity: { value: opacity },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const frameInterval = 1000 / targetFps
    const startedAt = performance.now()
    let frame = 0
    let lastDraw = 0
    let onScreen = true
    let contextLost = false

    const draw = (now: number) => {
      program.uniforms.iTime.value = (now - startedAt) * 0.001
      renderer.render({ scene: mesh })
    }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      renderer.setSize(Math.max(1, Math.floor(width)), Math.max(1, Math.floor(height)))
      const resolution = program.uniforms.iResolution.value as Float32Array
      resolution[0] = gl.drawingBufferWidth
      resolution[1] = gl.drawingBufferHeight
      draw(performance.now())
    }

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (now - lastDraw < frameInterval) return
      lastDraw = now
      draw(now)
    }

    const pause = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }
    const update = () => {
      const paused = reduceMotion.matches || document.documentElement.dataset.motion === 'paused'
      const shouldPlay = !contextLost && onScreen && !document.hidden && !paused
      if (shouldPlay && !frame) frame = requestAnimationFrame(loop)
      if (!shouldPlay) pause()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      update()
    })
    visibilityObserver.observe(container)
    document.addEventListener('visibilitychange', update)
    reduceMotion.addEventListener('change', update)
    window.addEventListener('motionchange', update)

    const onContextLost = (event: Event) => {
      event.preventDefault()
      contextLost = true
      pause()
      container.classList.remove('is-ready')
    }
    const onContextRestored = () => {
      contextLost = false
      resize()
      container.classList.add('is-ready')
      update()
    }
    canvas.addEventListener('webglcontextlost', onContextLost)
    canvas.addEventListener('webglcontextrestored', onContextRestored)

    resize()
    // El contenedor se muestra (.is-ready) solo después de dibujar el primer cuadro.
    container.classList.add('is-ready')
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
      container.classList.remove('is-ready')
      if (canvas.parentNode === container) container.removeChild(canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [color, speed, scale, opacity, iterations, renderScale, maxDpr, targetFps])

  return <div ref={containerRef} className={className} aria-hidden="true" />
}
