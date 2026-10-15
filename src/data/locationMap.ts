// DIBUJO DEL PLANO DE LA TARJETA DE UBICACIÓN (components/ui/LocationMap.tsx)
//
// Ilustración PROPIA (no es un mapa real ni usa imágenes de Google) calcada a mano de la estructura de la zona: la Vía Rápida
// (la diagonal grande) con su calle lateral, José María Velasco, David Alfaro Siqueiros, Av. Diego Rivera, Frida Kahlo y
// Saturnino Herrán, la pista ovalada del estacionamiento y las manzanas.
// • Lienzo de 767 x 866 (el tamaño de la captura de referencia). `MAP_VIEW` es el recorte que se muestra (con `slice`).
// • La cuadrícula tiene dos direcciones, perpendiculares entre sí: la de la Vía Rápida (37°, "u") y la de Velasco/Siqueiros
//   (-53°, "v"). Las calles van rectas sobre esas dos direcciones y los edificios son rectángulos girados esos mismos 37°
//   (`rect`): por eso quedan cuadrados y alineados con las calles.
// • Solo nombres de calles: no se incluyen negocios ni lugares de terceros.
// • Para mover la clínica cambia `PIN`; para ajustar el encuadre, `MAP_VIEW`.

export const MAP_VIEW = '0 0 767 866'

/** Posición de la punta del pin de Dental Nakeji. */
export const PIN = { x: 548, y: 225 }

/** Giro de la cuadrícula (la dirección de la Vía Rápida). */
const GRID_DEG = 37

/** Rectángulo girado con la cuadrícula: centro, ancho (a lo largo de la Vía Rápida) y alto (a lo largo de Velasco). */
function rect(cx: number, cy: number, w: number, h: number): string {
  const a = (GRID_DEG * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-Math.sin(a), Math.cos(a)]
  return [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]
    .map(([sx, sy]) => {
      const x = cx + (sx * w * u[0]) / 2 + (sy * h * v[0]) / 2
      const y = cy + (sx * w * u[1]) / 2 + (sy * h * v[1]) / 2
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

/** Pista ovalada ("estadio"): centro, largo total, ancho y dirección del eje largo en grados. */
function stadium(cx: number, cy: number, length: number, width: number, deg: number): string {
  const a = (deg * Math.PI) / 180
  const d = [Math.cos(a), Math.sin(a)]
  const n = [-Math.sin(a), Math.cos(a)]
  const r = width / 2
  const half = length / 2 - r
  const at = (x: number, y: number) => `${(cx + x * d[0] + y * n[0]).toFixed(1)} ${(cy + x * d[1] + y * n[1]).toFixed(1)}`
  return `M${at(-half, -r)} L${at(half, -r)} A${r} ${r} 0 0 1 ${at(half, r)} L${at(-half, r)} A${r} ${r} 0 0 1 ${at(-half, -r)} Z`
}

export type RoadKind = 'arterial' | 'primary' | 'minor'

export interface Road {
  d: string
  kind: RoadKind
  /** Ancho del trazo en unidades del lienzo. */
  width: number
}

export const ROADS: Road[] = [
  // Vía Rápida (autopista, la diagonal grande) y su calle lateral
  { d: 'M395 0 L767 280', kind: 'arterial', width: 46 },
  { d: 'M343 2 L767 316', kind: 'primary', width: 24 },
  // José María Velasco y David Alfaro Siqueiros (perpendiculares a la Vía Rápida)
  { d: 'M548 143 L15 866', kind: 'primary', width: 34 },
  { d: 'M762 330 L352 866', kind: 'primary', width: 32 },
  // Av. Diego Rivera
  { d: 'M0 358 L263 0', kind: 'primary', width: 22 },
  // Frida Kahlo y Saturnino Herrán (paralelas a la Vía Rápida)
  { d: 'M618 522 L767 632', kind: 'minor', width: 22 },
  { d: 'M485 690 L700 849', kind: 'minor', width: 22 },
  // Callejón junto al pin (sin salida)
  { d: 'M570 332 L620 268', kind: 'minor', width: 16 },
  // Pista ovalada del estacionamiento y sus dos callecitas hacia Siqueiros (una entra y otra sale, paralelas a la Vía Rápida)
  { d: stadium(410, 640, 186, 54, -53), kind: 'minor', width: 14 },
  { d: 'M438 648 L491 688', kind: 'minor', width: 10 },
  { d: 'M423 667 L476 707', kind: 'minor', width: 10 },
]

export interface Block {
  /** Puntos del polígono. */
  points: string
  /** a: edificio gris; b: manzana comercial (un poco más clara). */
  tone: 'a' | 'b'
}

/** [centro x, centro y, ancho, alto, tono] de cada edificio; `rect` los gira con la cuadrícula. */
const BLOCK_SPECS: [number, number, number, number, Block['tone']][] = [
  // Arriba
  [125, 45, 130, 95, 'b'],
  [20, 185, 100, 120, 'b'],
  [355, 115, 85, 60, 'a'],
  [435, 160, 85, 60, 'a'],
  [237, 175, 34, 26, 'a'],
  // Centro izquierda (junto a Velasco)
  [185, 305, 150, 110, 'b'],
  [215, 395, 120, 60, 'b'],
  [330, 255, 70, 50, 'a'],
  [312, 350, 60, 30, 'a'],
  [300, 405, 22, 22, 'a'],
  [375, 285, 45, 45, 'b'],
  // Centro (alrededor de la clínica y del estacionamiento)
  [470, 368, 90, 70, 'b'],
  [505, 303, 36, 22, 'a'],
  [410, 450, 110, 50, 'b'],
  [505, 520, 105, 48, 'b'],
  [545, 440, 30, 28, 'a'],
  [582, 465, 34, 30, 'a'],
  [335, 555, 120, 95, 'b'],
  [237, 665, 62, 48, 'a'],
  [153, 752, 24, 18, 'a'],
  // Derecha
  [648, 350, 100, 88, 'a'],
  [600, 392, 95, 52, 'b'],
  [740, 455, 60, 45, 'a'],
  [740, 545, 60, 70, 'a'],
  [690, 515, 40, 40, 'b'],
  [730, 660, 110, 90, 'a'],
  [625, 600, 55, 50, 'a'],
  [640, 665, 70, 60, 'a'],
  [535, 770, 70, 42, 'a'],
  // Izquierda
  [45, 600, 100, 160, 'a'],
  [80, 660, 125, 120, 'b'],
  [55, 470, 100, 70, 'b'],
  [88, 505, 30, 22, 'a'],
]

export const BLOCKS: Block[] = BLOCK_SPECS.map(([cx, cy, w, h, tone]) => ({ points: rect(cx, cy, w, h), tone }))

/** Zonas grandes: terreno junto a la autopista, el canal del río (esquina) y el parque de abajo a la izquierda. */
export const TERRAIN = '408,0 767,0 767,262'
export const RIVER = 'M690 0 L767 52'
export const PARK = '0,745 70,800 200,866 0,866'

export interface MapLabel {
  text: string
  x: number
  y: number
  /** Giro en grados para seguir la calle. */
  angle: number
}

export const LABELS: MapLabel[] = [
  { text: 'Av. Vía Rápida Pte.', x: 470, y: 57, angle: 37 },
  { text: 'José María Velasco', x: 330, y: 440, angle: -53 },
  { text: 'José María Velasco', x: 130, y: 700, angle: -53 },
  { text: 'David Alfaro Siqueiros', x: 552, y: 607, angle: -53 },
  { text: 'David Alfaro Siqueiros', x: 395, y: 835, angle: -53 },
  { text: 'Av. Diego Rivera', x: 75, y: 256, angle: -54 },
  { text: 'Frida Kahlo', x: 655, y: 550, angle: 37 },
  { text: 'Saturnino Herrán', x: 575, y: 757, angle: 37 },
]
