// ─────────────────────────────────────────────────────────────────────────────
// FONDO DE MODELOS DENTALES EN NODOS: modelos 3D de alambre (como impresos en 3D) hechos de nodos y conexiones, con
// pequeñas constelaciones de estrellas que los unen en una sola red. Colores solo de la marca: azules, oro y blanco.
// • CareStory: un globo terráqueo (con red de hilos y órbita) con arcos dorados de varias ciudades hacia Tijuana, un
//   avión que vuela hacia él ("pacientes de todo el mundo") y una muela sobre una base circular tipo holograma.
// • Servicios destacados: implantes (tornillo con rosca que gira, pilar y corona), muelas (una sobre su base),
//   un giroscopio de tres anillos y un átomo con una muela de núcleo y tres órbitas.
// • Red: cada grupo (modelo o constelación) se une con los grupos cercanos por su par de nodos más próximo, y por las
//   líneas, los arcos, la rosca, las órbitas y las estelas viajan pulsos dorados, como señales entre neuronas.
// • Al acercar el mouse, los nodos se conectan con el cursor; el modelo gira rápido, se abre como una vista explotada y
//   la luz que entra desde el cursor sale del otro lado en un abanico oro → blanco → azul (como un prisma).
// Sin librería ni CDN (la CSP de vercel.json no permite scripts externos). Se pasa como `decor` de una Band: queda encima
// del fondo y debajo del contenido (particles-bg.css, que también lo oculta en celular y tableta). Respeta "Pausar
// animaciones" / "reducir movimiento" (queda quieto) y se detiene fuera de pantalla.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { motionOff } from '@/lib/motion'

// Paleta de la marca (tokens.css): oro base, blanco, azul claro del isotipo y azul del isotipo.
const GOLD = [224, 182, 92]
const WHITE = [255, 255, 255]
const SKY = [123, 195, 235]
const BRAND = [58, 112, 176]
/** Ida y vuelta por la paleta (oro → blanco → azul claro → azul → …): así nunca pasa por mezclas grises. */
const CYCLE = [GOLD, WHITE, SKY, BRAND]
/** Abanico de luz, del oro al azul (el "arcoíris" de la marca). */
const FAN = [GOLD, [240, 214, 150], WHITE, SKY, [90, 152, 214], BRAND]
/** Alcance (px a 1440 de ancho) del mouse y de los puentes entre grupos. */
const GRAB = 300
const REACH = 320

const rgba = ([r, g, b]: number[], a: number) => `rgba(${r}, ${g}, ${b}, ${Math.max(0, a)})`

/** Color de la paleta en `u` (cualquier número; avanza y regresa). */
function paletteAt(u: number) {
  let t = ((u % 2) + 2) % 2
  if (t > 1) t = 2 - t
  const x = t * (CYCLE.length - 1)
  const i = Math.min(CYCLE.length - 2, Math.floor(x))
  const f = x - i
  return CYCLE[i].map((c, k) => Math.round(c + (CYCLE[i + 1][k] - c) * f))
}

type Vec = [number, number, number]

/**
 * Modelo de alambre: vértices y aristas (tag 1 = oro, 2 = azul claro; sin tag, la paleta que corre), los vértices que se
 * dibujan como nodo, los nodos dorados (puntos clave) y los recorridos por donde viajan pulsos.
 * Coordenadas: y hacia abajo (como la pantalla), z hacia el fondo; el modelo cabe más o menos en -1…1.
 */
interface Mesh {
  v: Vec[]
  e: [number, number, (1 | 2)?][]
  nodes: number[]
  gold: number[]
  paths: number[][]
  /** Opacidad de las aristas (los modelos con muchas líneas van más tenues para no pesar a la vista). */
  alpha?: number
}

/** Herramientas para armar un modelo (nuevo, o uno existente al que se le agregan piezas). */
function mesh(m: Mesh = { v: [], e: [], nodes: [], gold: [], paths: [] }) {
  const add = (p: Vec) => m.v.push(p) - 1
  const chain = (ids: number[], closed: boolean, tag?: 1 | 2) =>
    ids.forEach((id, k) => {
      if (k || closed) m.e.push([ids[(k - 1 + ids.length) % ids.length], id, tag])
    })
  /** Anillo horizontal de `count` puntos (impar) a la altura y, con radios rx/rz y centro en x/z. */
  const ring = (y: number, rx: number, rz: number, count: number, cx = 0, cz = 0, lift?: (k: number) => number) => {
    const ids = Array.from({ length: count }, (_, k) => {
      const a = (2 * Math.PI * k) / count
      return add([cx + rx * Math.cos(a), y + (lift?.(k) ?? 0), cz + rz * Math.sin(a)])
    })
    chain(ids, true)
    return ids
  }
  /** Une dos anillos del mismo tamaño punto por punto (las "costillas" de la pieza impresa). */
  const ribs = (a: number[], b: number[], tag?: 1 | 2) => a.forEach((id, k) => m.e.push([id, b[k], tag]))
  return { m, add, chain, ring, ribs }
}

const rotX = ([x, y, z]: Vec, a: number): Vec => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)]
const rotY = ([x, y, z]: Vec, a: number): Vec => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)]
const rotZ = ([x, y, z]: Vec, a: number): Vec => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), z]

/**
 * Globo terráqueo: 7 paralelos y 11 meridianos con nodos en los cruces; por fuera, una red de hilos (33 nodos repartidos
 * en espiral, cada uno unido a sus 2 vecinos y con un hilo a la superficie); un anillo de órbita inclinado por donde
 * viajan dos "satélites"; y arcos dorados de varias ciudades hacia Tijuana (por ahí viajan pulsos).
 */
function globe(): Mesh {
  const { m, add, chain } = mesh()
  m.alpha = 0.75
  const at = (lat: number, lon: number, r = 1): Vec => {
    const a = (lat * Math.PI) / 180
    const b = (lon * Math.PI) / 180
    return [r * Math.cos(a) * Math.cos(b), -r * Math.sin(a), r * Math.cos(a) * Math.sin(b)]
  }
  const PARALLELS = [-75, -50, -25, 0, 25, 50, 75]
  for (const lat of PARALLELS) chain(Array.from({ length: 27 }, (_, k) => add(at(lat, (k * 360) / 27))), true)
  // Meridianos de polo a polo cada 12.5°: pasan justo por los paralelos (ahí van los nodos de los cruces).
  const lats = [-90, ...Array.from({ length: 13 }, (_, i) => -75 + i * 12.5), 90]
  const crossings: number[] = []
  for (let k = 0; k < 11; k++) {
    const ids = lats.map((lat) => add(at(lat, (k * 360) / 11)))
    chain(ids, false)
    crossings.push(...ids.filter((_, i) => PARALLELS.includes(lats[i])))
  }
  m.nodes.push(...crossings.filter((_, i) => i % 2 === 0))

  // Red exterior: puntos en espiral (reparto parejo sobre la esfera), cada uno con sus 2 vecinos y un hilo al globo.
  const shell = Array.from({ length: 33 }, (_, i): Vec => {
    const y = 1 - (2 * (i + 0.5)) / 33
    const r = Math.sqrt(1 - y * y)
    const a = i * Math.PI * (3 - Math.sqrt(5))
    return [1.16 * r * Math.cos(a), 1.16 * y, 1.16 * r * Math.sin(a)]
  })
  const shellIds = shell.map(add)
  const dist = (a: Vec, b: Vec) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
  const seen = new Set<string>()
  shell.forEach((p, i) => {
    const near = shell.map((q, j) => [dist(p, q), j] as const).filter(([, j]) => j !== i).sort((a, b) => a[0] - b[0])
    for (const [, j] of near.slice(0, 2)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!seen.has(key)) m.e.push([shellIds[i], shellIds[j], 2])
      seen.add(key)
    }
    const ground = crossings.reduce((best, c) => (dist(m.v[c], p) < dist(m.v[best], p) ? c : best))
    m.e.push([shellIds[i], ground, 2])
  })
  m.nodes.push(...shellIds)

  // Órbita inclinada: dos pulsos la recorren como satélites.
  const orbit = Array.from({ length: 31 }, (_, k) => {
    const a = (2 * Math.PI * k) / 31
    return add(rotZ(rotX([1.38 * Math.cos(a), 0, 1.38 * Math.sin(a)], 0.45), 0.3))
  })
  chain(orbit, true)
  m.paths.push([...orbit, orbit[0]], [...orbit, orbit[0]])

  const home = at(32.5, -117)
  const tijuana = add(home)
  m.gold.push(tijuana)
  const cities: [number, number][] = [
    [40.7, -74], [49.3, -123.1], [41.9, -87.6], [19.4, -99.1], [40.4, -3.7], [35.7, 139.7], [-33.9, 151.2], [-23.5, -46.6],
  ]
  for (const [lat, lon] of cities) {
    const from = at(lat, lon)
    const angle = Math.acos(Math.min(1, from[0] * home[0] + from[1] * home[1] + from[2] * home[2]))
    // Arco por el círculo máximo, levantado sobre la superficie (más alto cuanto más lejos está la ciudad).
    const ids = Array.from({ length: 15 }, (_, i) => {
      const s = i / 14
      const a = Math.sin((1 - s) * angle) / Math.sin(angle)
      const b = Math.sin(s * angle) / Math.sin(angle)
      const r = 1 + Math.sin(Math.PI * s) * (0.06 + angle * 0.06)
      return i === 14 ? tijuana : add([(a * from[0] + b * home[0]) * r, (a * from[1] + b * home[1]) * r, (a * from[2] + b * home[2]) * r])
    })
    chain(ids, false, 1)
    m.gold.push(ids[0])
    m.paths.push(ids)
  }
  return m
}

/** Muela inferior: corona con cinco cúspides y fosa central, cuello y dos raíces que se afinan hasta el ápice. */
function molar(): Mesh {
  const { m, add, ring, ribs } = mesh()
  const N = 15
  // Cúspides en los puntos k % 3 = 0 (5 de 15): el borde de arriba sube en ellas.
  const cusp = (k: number) => -0.2 * Math.max(0, Math.cos((10 * Math.PI * k) / N)) ** 3
  const crown = [
    ring(-0.62, 0.66, 0.56, N, 0, 0, cusp),
    ring(-0.42, 0.8, 0.68, N),
    ring(-0.15, 0.78, 0.66, N),
    ring(0.1, 0.64, 0.54, N),
  ]
  crown.slice(1).forEach((r, i) => ribs(crown[i], r))
  const fossa = add([0, -0.5, 0])
  const tips = crown[0].filter((_, k) => k % 3 === 0)
  for (const tip of tips) m.e.push([fossa, tip])
  m.gold.push(...tips)
  const neck = crown[3]

  for (const side of [-1, 1]) {
    const roots = [0.34, 0.74, 1.1].map((y, i) => ring(y, 0.3 - i * 0.06, 0.26 - i * 0.05, 7, side * (0.36 + i * 0.04)))
    roots.slice(1).forEach((r, i) => ribs(roots[i], r))
    const apex = add([side * 0.47, 1.42, 0])
    for (const id of roots[2]) m.e.push([id, apex])
    // La raíz nace del cuello: cada punto de arriba se une al punto del cuello más cercano.
    for (const id of roots[0]) {
      const p = m.v[id]
      const near = neck.reduce((best, n) => (Math.hypot(m.v[n][0] - p[0], m.v[n][2] - p[2]) < Math.hypot(m.v[best][0] - p[0], m.v[best][2] - p[2]) ? n : best))
      m.e.push([id, near, 2])
    }
    m.gold.push(apex)
    m.nodes.push(...roots[1])
    m.paths.push([apex, roots[2][0], roots[1][0], roots[0][0]])
  }
  m.nodes.push(fossa, ...crown[1].filter((_, k) => k % 2 === 0), ...neck.filter((_, k) => k % 2 === 0))
  // Pulsos que suben por la muela del cuello a las cúspides.
  for (const k of [0, 6, 9]) m.paths.push([crown[3][k], crown[2][k], crown[1][k], crown[0][k]])
  for (const v of m.v) v[1] -= 0.35
  return m
}

/** Implante: tornillo con rosca en espiral (gira, como si se atornillara), pilar y corona. */
function implant(time: number): Mesh {
  const { m, add, chain, ring, ribs } = mesh()
  const core = [0.02, 0.5, 1.0].map((y, i) => ring(y, 0.24 - i * 0.04, 0.24 - i * 0.04, 9))
  core.slice(1).forEach((r, i) => ribs(core[i], r, 2))
  const apex = add([0, 1.2, 0])
  for (const id of core[2]) m.e.push([id, apex, 2])

  // Rosca: 4 vueltas de 9 puntos que se afinan en la punta.
  const thread = Array.from({ length: 37 }, (_, i) => {
    const s = i / 36
    const a = s * 8 * Math.PI + time * 1.4
    const r = 0.4 - 0.16 * Math.max(0, (s - 0.7) / 0.3)
    return add([r * Math.cos(a), 0.02 + s * 1.05, r * Math.sin(a)])
  })
  chain(thread, false, 1)
  m.paths.push(thread)

  const abutment = [-0.08, -0.34].map((y, i) => ring(y, 0.26 - i * 0.07, 0.26 - i * 0.07, 9))
  ribs(abutment[0], abutment[1], 2)
  ribs(abutment[0], core[0], 2)
  // Corona con forma de diente: se ensancha desde el cuello, y arriba tres cúspides alrededor de una fosa.
  const cusps = (k: number) => -0.14 * Math.max(0, Math.cos((6 * Math.PI * k) / 9)) ** 3
  const crown = [
    ring(-0.4, 0.34, 0.3, 9),
    ring(-0.62, 0.5, 0.44, 9),
    ring(-0.84, 0.52, 0.46, 9),
    ring(-0.98, 0.42, 0.37, 9, 0, 0, cusps),
  ]
  crown.slice(1).forEach((r, i) => ribs(crown[i], r))
  ribs(abutment[1], crown[0])
  const fossa = add([0, -0.9, 0])
  const tips = crown[3].filter((_, k) => k % 3 === 0)
  for (const tip of tips) m.e.push([fossa, tip])

  m.nodes.push(fossa, ...crown[1], ...abutment[1], ...thread.filter((_, i) => i % 4 === 0))
  m.gold.push(...tips, apex)
  for (const v of m.v) v[1] += 0.04
  return m
}

/**
 * Muela sobre una base circular tipo holograma: tres anillos de nodos que giran a distinta velocidad y en sentidos
 * contrarios, unidos por rayos que se deslizan entre ellos. La muela flota encima subiendo y bajando, con hilos finos de
 * sus raíces a la base, y dos pulsos recorren los anillos.
 */
function molarOnBase(time: number): Mesh {
  const m = molar()
  const bob = 0.05 * Math.sin(time * 1.3)
  for (const v of m.v) {
    v[0] *= 0.78
    v[1] = v[1] * 0.78 - 0.3 + bob
    v[2] *= 0.78
  }
  const apexes = m.gold.filter((i) => m.v[i][1] > 0.2)
  const { add, chain } = mesh(m)
  const rings = (
    [
      [0.5, 15, 0.5, 2],
      [0.82, 21, -0.35, undefined],
      [1.14, 27, 0.22, 1],
    ] as const
  ).map(([r, n, speed, tag]) => {
    const turn = time * speed
    const ids = Array.from({ length: n }, (_, k) => {
      const a = (2 * Math.PI * k) / n + turn
      return add([r * Math.cos(a), 1, r * Math.sin(a)])
    })
    chain(ids, true, tag)
    return { ids, turn, n }
  })
  // Rayos: cada 3 nodos, al nodo del anillo de afuera más cercano en ángulo (se deslizan porque giran distinto).
  rings.slice(1).forEach((outer, i) => {
    const inner = rings[i]
    inner.ids.forEach((id, k) => {
      if (k % 3) return
      const a = (2 * Math.PI * k) / inner.n + inner.turn
      const j = Math.round(((a - outer.turn) / (2 * Math.PI)) * outer.n)
      m.e.push([id, outer.ids[((j % outer.n) + outer.n) % outer.n], 2])
    })
  })
  for (const apex of apexes) for (const k of [0, 5, 10]) m.e.push([apex, rings[0].ids[k], 2])
  m.nodes.push(...rings.flatMap((r) => r.ids.filter((_, k) => k % 3 === 0)))
  m.paths.push([...rings[2].ids, rings[2].ids[0]], [...rings[0].ids, rings[0].ids[0]].reverse())
  return m
}

/**
 * Avión de alambre (fuselaje de anillos, alas en flecha con motores, cola) volando en diagonal hacia el globo. De sus
 * motores salen dos estelas por donde corren pulsos ("pacientes de todo el mundo" que llegan a Tijuana).
 */
function plane(): Mesh {
  const { m, add, chain, ribs } = mesh()
  /** Anillo de `count` puntos alrededor del eje x (el largo del avión). */
  const hoop = (x: number, r: number, count: number, y = 0, z = 0) => {
    const ids = Array.from({ length: count }, (_, k) => {
      const a = (2 * Math.PI * k) / count
      return add([x, y + r * Math.cos(a), z + r * Math.sin(a)])
    })
    chain(ids, true)
    return ids
  }
  const body = (
    [
      [-1, 0.07],
      [-0.6, 0.13],
      [0, 0.15],
      [0.5, 0.13],
      [0.85, 0.07],
    ] as const
  ).map(([x, r]) => hoop(x, r, 7))
  body.slice(1).forEach((h, i) => ribs(body[i], h))
  const nose = add([1.08, 0, 0])
  for (const id of body[4]) m.e.push([id, nose])
  const tail = add([-1.12, 0, 0])
  for (const id of body[0]) m.e.push([id, tail])
  for (const side of [-1, 1]) {
    // Ala en flecha (borde de ataque y de salida) y estabilizador de la cola.
    const wing = [add([0.3, 0.02, side * 0.14]), add([-0.28, 0.04, side]), add([-0.42, 0.04, side]), add([-0.18, 0.02, side * 0.14])]
    chain(wing, true)
    chain([add([-0.78, 0, side * 0.06]), add([-1.02, 0, side * 0.42]), add([-1.12, 0, side * 0.42]), add([-1.02, 0, side * 0.06])], true)
    // Motor bajo el ala y su estela, que se abre un poco hacia atrás.
    const front = hoop(0.08, 0.06, 5, 0.12, side * 0.48)
    const back = hoop(-0.14, 0.05, 5, 0.12, side * 0.48)
    ribs(front, back, 2)
    const trail = [back[0], ...Array.from({ length: 10 }, (_, k) => add([-0.36 - k * 0.22, 0.12 + k * 0.01, side * (0.48 + k * 0.03)]))]
    chain(trail, false, 2)
    m.paths.push(trail)
    m.gold.push(wing[1])
  }
  // Timón vertical.
  chain([add([-0.72, -0.12, 0]), add([-1.02, -0.5, 0]), add([-1.12, -0.5, 0]), add([-1.06, -0.1, 0])], true)
  m.nodes.push(...body.flatMap((h) => [h[0], h[3]]), tail)
  m.gold.push(nose)
  // Rumbo: visto desde arriba (inclinación ~1.1), la nariz apunta abajo a la derecha, hacia el globo.
  m.v = m.v.map((v) => rotY(v, 0.6))
  return m
}

/** Giroscopio: tres anillos de nodos que giran cada uno sobre un eje distinto alrededor de un núcleo dorado, unidos a él. */
function gyro(time: number): Mesh {
  const { m, add, chain } = mesh()
  const core = add([0, 0, 0])
  m.gold.push(core)
  const circles: ((a: number, r: number) => Vec)[] = [
    (a, r) => rotX(rotY([r * Math.cos(a), 0, r * Math.sin(a)], time * 0.6), 0.3),
    (a, r) => rotY([r * Math.cos(a), r * Math.sin(a), 0], time * 0.9),
    // Vuelca hacia adelante y atrás sobre un eje inclinado (sobre el eje z se vería siempre de canto).
    (a, r) => rotZ(rotX([r * Math.cos(a), r * Math.sin(a), 0], -time * 1.2), 0.6),
  ]
  circles.forEach((circle, i) => {
    const ids = Array.from({ length: 21 }, (_, k) => add(circle((2 * Math.PI * k) / 21, 1 - i * 0.16)))
    chain(ids, true, i === 1 ? 1 : undefined)
    for (const k of [0, 7, 14]) m.e.push([ids[k], core, 2])
    m.nodes.push(...ids.filter((_, k) => k % 3 === 0))
    m.gold.push(ids[0])
    m.paths.push([...ids, ids[0]])
  })
  return m
}

/** Átomo dental: una muela pequeña de núcleo y tres órbitas elípticas inclinadas, cada una con su "electrón" dorado. */
function atom(time: number): Mesh {
  const m = molar()
  for (const v of m.v) for (let j = 0; j < 3; j++) v[j] *= 0.34
  // El núcleo solo lleva sus cúspides doradas: sus nodos blancos, tan juntos, se verían como una mancha.
  m.nodes = []
  const { add, chain } = mesh(m)
  for (let k = 0; k < 3; k++) {
    // La elipse se inclina hacia el frente (si no, se vería de canto, como línea), se reparte cada 60° y gira despacio en
    // el plano de la pantalla: así las tres órbitas siempre se ven abiertas.
    const place = (a: number) => rotZ(rotX([1.05 * Math.cos(a), 0, 0.42 * Math.sin(a)], 1.15), (k * Math.PI) / 3 + time * 0.15)
    const ids = Array.from({ length: 25 }, (_, i) => add(place((2 * Math.PI * i) / 25)))
    chain(ids, true)
    m.paths.push([...ids, ids[0]])
    m.nodes.push(...ids.filter((_, i) => i % 5 === 0))
    m.gold.push(add(place(time * 1.6 + (k * 2 * Math.PI) / 3)))
  }
  return m
}

/** `animated`: el modelo cambia con el tiempo (rosca, anillos, órbitas); los demás se calculan una sola vez. */
interface Model {
  make: (time: number) => Mesh
  animated?: boolean
}
const GLOBE: Model = { make: globe }
const MOLAR: Model = { make: molar }
const MOLAR_BASE: Model = { make: molarOnBase, animated: true }
const IMPLANT: Model = { make: implant, animated: true }
const PLANE: Model = { make: plane }
const GYRO: Model = { make: gyro, animated: true }
const ATOM: Model = { make: atom, animated: true }

/**
 * Modelo colocado en la sección: centro en fracción del ancho/alto, radio en px (a 1440 px de ancho), velocidad de giro
 * (de pie, sobre su eje vertical), inclinación hacia el que mira y `sway` (se mece de lado a lado en vez de dar vueltas).
 * `minWidth` (también en las constelaciones): se oculta en lienzos más angostos (ahí chocaría con el texto o quedaría
 * escondido detrás de las tarjetas).
 */
interface Piece {
  model: Model
  x: number
  y: number
  size: number
  spin: number
  tilt: number
  sway?: boolean
  minWidth?: number
}

/** Estrella de una constelación: posición local (-1 a 1, por `size`), brillo (radio) y si es dorada. */
type Star = [x: number, y: number, mag: number, gold?: boolean]

/** Constelación colocada en la sección: centro en fracción del ancho/alto, medio ancho en px (a 1440 px). */
interface Constellation {
  x: number
  y: number
  size: number
  stars: Star[]
  links: [number, number][]
  minWidth?: number
}

// Posiciones en las orillas, lejos del texto (como en las fotos de referencia del cliente). Los `minWidth` salen de la
// revisión con Playwright de 960 a 1920 px.
const SCENES: Record<'story' | 'services', { pieces: Piece[]; constellations: Constellation[] }> = {
  story: {
    pieces: [
      { model: GLOBE, x: 0.17, y: 0.8, size: 120, spin: 0.5, tilt: 0.35 },
      { model: MOLAR_BASE, x: 0.92, y: 0.36, size: 62, spin: -0.6, tilt: 0.4 },
      // Arriba del globo, rumbo a él (solo con espacio: en pantallas angostas tocaría el titular).
      { model: PLANE, x: 0.07, y: 0.52, size: 64, spin: 1, tilt: 1.1, sway: true, minWidth: 1200 },
    ],
    constellations: [
      // Derecha: cometa de cuatro estrellas bajo la muela.
      {
        x: 0.9,
        y: 0.57,
        size: 60,
        stars: [[0, -0.8, 1], [-0.7, 0, 0.8], [0, 0.7, 1.2, true], [0.6, -0.1, 0.8]],
        links: [[0, 1], [1, 2], [2, 3], [3, 0]],
      },
    ],
  },
  services: {
    pieces: [
      { model: IMPLANT, x: 0.09, y: 0.16, size: 54, spin: 0.9, tilt: 0.22 },
      { model: GYRO, x: 0.27, y: 0.08, size: 36, spin: 0.6, tilt: 0.3, minWidth: 1200 },
      { model: MOLAR_BASE, x: 0.74, y: 0.09, size: 38, spin: 1, tilt: 0.4, minWidth: 1200 },
      { model: ATOM, x: 0.9, y: 0.15, size: 66, spin: -0.4, tilt: 0.1, sway: true },
      { model: MOLAR, x: 0.05, y: 0.62, size: 34, spin: 1.1, tilt: 0.3, minWidth: 1300 },
      { model: IMPLANT, x: 0.95, y: 0.68, size: 38, spin: -1, tilt: 0.22, minWidth: 1300 },
    ],
    constellations: [
      // Izquierda arriba: racimo de neuronas entre el implante y el giroscopio.
      {
        x: 0.18,
        y: 0.19,
        size: 70,
        stars: [[-0.6, -0.3, 0.8], [-0.1, -0.7, 1], [0.5, -0.4, 0.8], [0.2, 0.2, 1.3, true], [-0.4, 0.5, 0.9], [0.8, 0.5, 0.7]],
        links: [[0, 1], [1, 2], [1, 3], [2, 3], [3, 4], [0, 4], [3, 5]],
        minWidth: 1200,
      },
      // Orillas, a media altura: columnas de estrellas que bajan a los modelos de abajo (solo con espacio a los lados).
      {
        x: 0.04,
        y: 0.4,
        size: 60,
        stars: [[0.3, -1, 0.8], [-0.2, -0.2, 1], [0.2, 0.6, 0.8], [-0.1, 1.3, 1.1, true]],
        links: [[0, 1], [1, 2], [2, 3]],
        minWidth: 1300,
      },
      {
        x: 0.96,
        y: 0.44,
        size: 60,
        stars: [[-0.2, -1.2, 0.9], [0.2, -0.4, 1.1, true], [-0.3, 0.4, 0.8], [0.1, 1.2, 0.9]],
        links: [[0, 1], [1, 2], [2, 3]],
        minWidth: 1300,
      },
    ],
  },
}

interface State {
  piece: Piece
  /** Modelo ya calculado (los que no cambian con el tiempo). */
  mesh?: Mesh
  ay: number
  hover: number
  phase: number
  /** Nodos hijos: orbitan algunos nodos del modelo (dirección y distancia al azar). */
  children: { vertex: number; offset: Vec; phase: number }[]
  /** Nodos que se unen con los otros grupos y con el cursor (los dorados y algunos más). */
  hubs: number[]
}

interface Point {
  x: number
  y: number
}

const randomDir = (): Vec => {
  const a = Math.random() * Math.PI * 2
  const z = Math.random() * 2 - 1
  const r = Math.sqrt(1 - z * z)
  return [r * Math.cos(a), r * Math.sin(a), z]
}

export function ParticlesBackground({ variant }: { variant: keyof typeof SCENES }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return

    const scene = SCENES[variant]
    const states: State[] = scene.pieces.map((piece) => {
      const first = piece.model.make(0)
      // Unos 14 hijos por modelo, repartidos entre sus nodos.
      const every = Math.max(1, Math.round(first.nodes.length / 14))
      const picked = first.nodes.filter((_, k) => k % every === 0)
      return {
        piece,
        mesh: piece.model.animated ? undefined : first,
        // Los que se mecen (el avión) arrancan de frente; los demás, en un giro al azar.
        ay: piece.sway ? 0 : Math.random() * Math.PI * 2,
        hover: 0,
        phase: Math.random() * Math.PI * 2,
        children: picked.map((vertex) => ({
          vertex,
          offset: randomDir().map((c) => c * (0.14 + Math.random() * 0.12)) as Vec,
          phase: Math.random() * 6,
        })),
        hubs: [...first.gold, ...picked],
      }
    })
    const twinkle = scene.constellations.map((c) => c.stars.map(() => Math.random() * 6))

    let width = 0
    let height = 0
    /** Polvo de estrellas de fondo: posición en fracción, radio y fase del titileo (se rehace al cambiar de tamaño). */
    let dust: [number, number, number, number][] = []
    let mouse: Point | null = null
    let visible = false
    let frame = 0
    let last = 0
    let time = 0

    const line = (a: Point, b: Point, color: string | CanvasGradient, w = 1) => {
      ctx.strokeStyle = color
      ctx.lineWidth = w
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
    const dot = (x: number, y: number, r: number, color: string) => {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
    const scale = () => Math.min(1.2, Math.max(0.65, width / 1440))
    const shown = (item: { minWidth?: number }) => width >= (item.minWidth ?? 0)

    /** Pulso dorado que recorre un camino de vez en cuando (cada camino a su ritmo, por `seed`). */
    const pulse = (path: Point[], seed: number) => {
      const p = (time * 0.3 + seed) % 3
      if (p > 1) return
      const glow = Math.sin(p * Math.PI)
      const at = p * (path.length - 1)
      const i = Math.min(path.length - 2, Math.floor(at))
      const f = at - i
      const x = path[i].x + (path[i + 1].x - path[i].x) * f
      const y = path[i].y + (path[i + 1].y - path[i].y) * f
      dot(x, y, 5, rgba(GOLD, 0.18 * glow))
      dot(x, y, 1.8, rgba(GOLD, 0.95 * glow))
    }

    /** Abanico de luz: entra desde el cursor por el centro del modelo y sale abierto del otro lado. */
    const beam = (center: Point, size: number, strength: number) => {
      if (!mouse) return
      const angle = Math.atan2(center.y - mouse.y, center.x - mouse.x)
      // Corto (como mucho 180 px) para no cruzar los títulos.
      const length = Math.min(size * 3, 180 * scale())
      line(mouse, center, rgba(WHITE, 0.6 * strength), 1.5)
      FAN.forEach((color, k) => {
        const a = angle + (k - (FAN.length - 1) / 2) * 0.08
        const end = { x: center.x + Math.cos(a) * length, y: center.y + Math.sin(a) * length }
        const ray = ctx.createLinearGradient(center.x, center.y, end.x, end.y)
        ray.addColorStop(0, rgba(color, 0.7 * strength))
        ray.addColorStop(1, rgba(color, 0))
        line(center, end, ray, 2.5)
      })
    }

    /** Dibuja un modelo y devuelve sus nodos de enlace en pantalla (para los puentes y el mouse). */
    const drawPiece = (s: State): Point[] => {
      const { piece, hover: h } = s
      const m = s.mesh ?? piece.model.make(time)
      const center = {
        x: piece.x * width + Math.sin(time * 0.4 + s.phase) * 12,
        y: piece.y * height + Math.cos(time * 0.33 + s.phase) * 9,
      }
      const size = piece.size * scale() * (1 + 0.12 * h)
      // Vista explotada con el mouse: el modelo se abre un poco y se vuelve a armar.
      const burst = 1 + 0.3 * h
      // De pie: gira sobre su eje vertical (o se mece) con un leve cabeceo.
      const ax = piece.tilt + 0.12 * Math.sin(time * 0.45 + s.phase)
      const ay = s.ay + (piece.sway ? 0.55 * Math.sin(time * 0.5 + s.phase) : 0)
      const sx = Math.sin(ax)
      const cxs = Math.cos(ax)
      const sy = Math.sin(ay)
      const cys = Math.cos(ay)
      const project = ([x, y, z]: Vec) => {
        const x1 = x * cys + z * sy
        const z1 = -x * sy + z * cys
        const y1 = y * cxs - z1 * sx
        const z2 = y * sx + z1 * cxs
        const k = (size * burst * 3) / (3 + z2)
        // depth: lo de adelante se ve más brillante y grueso (como la luz sobre una pieza impresa).
        return { x: center.x + x1 * k, y: center.y + y1 * k, depth: 1 - 0.7 * ((Math.max(-1, Math.min(1, z2)) + 1) / 2) }
      }
      const points = m.v.map(project)

      if (h > 0.02) beam(center, size, h)

      m.e.forEach(([i, j, tag], n) => {
        const a = points[i]
        const b = points[j]
        const depth = (a.depth + b.depth) / 2
        const color = tag === 1 ? GOLD : tag === 2 ? SKY : paletteAt(time * 0.25 + n / m.e.length + s.phase)
        const alpha = ((tag === 1 ? 0.5 : 0.3) + 0.45 * h) * (m.alpha ?? 1)
        line(a, b, rgba(color, alpha * depth), (0.5 + 0.8 * depth) * (1 + 0.6 * h))
      })
      m.paths.forEach((path, n) => pulse(path.map((i) => points[i]), s.phase + n * 0.71))

      for (const c of s.children) {
        const v = m.v[c.vertex]
        const wobble = (1 + 0.3 * Math.sin(time * 2 + c.phase)) * (1 + h)
        const p = project([v[0] + c.offset[0] * wobble, v[1] + c.offset[1] * wobble, v[2] + c.offset[2] * wobble])
        line(p, points[c.vertex], rgba(SKY, 0.22 * p.depth))
        dot(p.x, p.y, 1, rgba(SKY, 0.55 * p.depth))
      }
      for (const i of m.nodes) {
        const p = points[i]
        dot(p.x, p.y, 3.5 * p.depth + h, rgba(SKY, 0.08 * p.depth))
        dot(p.x, p.y, (0.6 + 1.1 * p.depth) * (1 + 0.4 * h), rgba(WHITE, 0.8 * p.depth))
      }
      for (const i of m.gold) {
        const p = points[i]
        dot(p.x, p.y, 6 * p.depth + 2 * h, rgba(GOLD, 0.16 * p.depth))
        dot(p.x, p.y, (1 + 1.5 * p.depth) * (1 + 0.4 * h), rgba(GOLD, 0.95 * p.depth))
      }
      return s.hubs.map((i) => points[i])
    }

    /** Dibuja una constelación (líneas y estrellas que titilan) y devuelve sus estrellas en pantalla. */
    const drawConstellation = (c: Constellation, index: number): Point[] => {
      const size = c.size * scale()
      const points = c.stars.map(([x, y]) => ({ x: c.x * width + x * size, y: c.y * height + y * size }))
      c.links.forEach(([i, j], n) => {
        line(points[i], points[j], rgba(SKY, 0.32))
        pulse([points[i], points[j]], index * 0.9 + n * 0.53)
      })
      c.stars.forEach(([, , mag, gold], i) => {
        const { x, y } = points[i]
        const glow = 0.75 + 0.25 * Math.sin(time * 1.6 + twinkle[index][i])
        dot(x, y, (2.5 + mag * 3) * glow, rgba(gold ? GOLD : SKY, 0.12 * glow))
        dot(x, y, 0.9 + mag * 1.1, rgba(gold ? GOLD : WHITE, 0.9 * glow))
      })
      return points
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const [x, y, r, phase] of dust) dot(x * width, y * height, r, rgba(WHITE, 0.18 + 0.14 * Math.sin(time * 1.2 + phase)))

      const groups = [
        ...scene.constellations.map((c, i) => (shown(c) ? drawConstellation(c, i) : [])),
        ...states.map((s) => (shown(s.piece) ? drawPiece(s) : [])),
      ].filter((g) => g.length)

      // Puentes: cada par de grupos cercanos se une por su par de nodos más próximo (se mueve al girar los modelos).
      const reach = REACH * scale()
      groups.forEach((a, i) =>
        groups.slice(i + 1).forEach((b, k) => {
          let best = { d: Infinity, p: a[0], q: b[0] }
          for (const p of a)
            for (const q of b) {
              const d = Math.hypot(p.x - q.x, p.y - q.y)
              if (d < best.d) best = { d, p, q }
            }
          if (best.d > reach) return
          line(best.p, best.q, rgba(SKY, 0.5 * (1 - best.d / reach)))
          pulse([best.p, best.q], i * 1.7 + k * 0.8)
        }),
      )

      if (mouse) {
        const grab = GRAB * scale()
        for (const p of groups.flat()) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y)
          if (d < grab) line(p, mouse, rgba(SKY, 0.55 * (1 - d / grab)))
        }
      }
    }

    /** Hacia dónde va el "hover" de cada modelo: 1 si el mouse está cerca de su centro. */
    const hoverTarget = (s: State) =>
      mouse && Math.hypot(s.piece.x * width - mouse.x, s.piece.y * height - mouse.y) < s.piece.size * scale() * 1.6 ? 1 : 0

    const tick = (now: number) => {
      frame = 0
      // Pasos medidos en tiempo (no en cuadros) para girar igual en pantallas de 60 y de 120 Hz.
      const step = last ? Math.min(0.05, (now - last) / 1000) * 60 : 1
      last = now
      time += step / 60
      for (const s of states) {
        s.hover += (hoverTarget(s) - s.hover) * Math.min(1, 0.08 * step)
        // Los que se mecen solo dan vueltas con el mouse encima.
        s.ay += 0.006 * s.piece.spin * ((s.piece.sway ? 0 : 1) + 4 * s.hover) * step
      }
      draw()
      play()
    }

    const play = () => {
      if (motionOff()) last = 0
      else if (!frame && visible && width) frame = requestAnimationFrame(tick)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dust = Array.from({ length: Math.min(90, Math.round((width * height) / 22000)) }, () => [
        Math.random(),
        Math.random(),
        0.4 + Math.random() * 0.7,
        Math.random() * 6,
      ])
      draw()
      play()
    }

    // El mouse se escucha en la sección entera: el lienzo va debajo del contenido y no recibe eventos.
    // Pausado, el modelo reacciona al instante (sin transición) y se redibuja una vez.
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      if (!motionOff()) return
      for (const s of states) s.hover = hoverTarget(s)
      draw()
    }
    const onLeave = () => {
      mouse = null
      if (!motionOff()) return
      for (const s of states) s.hover = 0
      draw()
    }

    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(canvas)
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      last = 0
      play()
    })
    viewObserver.observe(canvas)
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    window.addEventListener('motionchange', play)
    return () => {
      cancelAnimationFrame(frame)
      sizeObserver.disconnect()
      viewObserver.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('motionchange', play)
    }
  }, [variant])

  return <canvas ref={ref} className="particles-bg" aria-hidden="true" />
}
