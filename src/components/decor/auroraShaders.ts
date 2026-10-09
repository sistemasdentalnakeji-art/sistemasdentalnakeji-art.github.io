// Shaders GLSL del fondo aurora del hero (WebGL 1).

export const VERTEX = `
attribute vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`

export const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uBase;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uIntensity;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotate = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rotate * p;
    amplitude *= 0.5;
  }
  return value;
}

float glow(vec2 p, vec2 c, float r) {
  vec2 d = p - c;
  return exp(-dot(d, d) / (r * r));
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  float t = uTime * 0.1;

  // Distorsión suave: las luces ondulan como una aurora.
  vec2 warp = vec2(fbm(p * 0.9 + vec2(0.0, t * 0.6)), fbm(p * 0.9 + vec2(4.3, -t * 0.5))) - 0.5;
  vec2 w = p + warp * 0.4;

  // Focos de luz que se desplazan lentamente (sobre todo a la derecha; el texto va a la izquierda).
  // c4 es el halo detrás del orbe (arriba a la izquierda).
  vec2 c1 = vec2(0.55 + 0.18 * sin(t * 0.8), 0.1 + 0.14 * cos(t * 0.6));
  vec2 c2 = vec2(0.12 + 0.22 * cos(t * 0.5), -0.24 + 0.12 * sin(t * 0.9));
  vec2 c3 = vec2(0.9 + 0.16 * cos(t * 0.7 + 1.0), -0.32 + 0.18 * sin(t * 0.4));
  vec2 c4 = vec2(-0.55 + 0.1 * sin(t * 0.6 + 2.0), 0.32 + 0.08 * cos(t * 0.8));

  // Cortinas verticales muy suaves dentro de la luz.
  float curtains = 0.45 + 1.0 * fbm(vec2(w.x * 2.4 + t * 0.35, w.y * 0.55 - t * 0.1));

  float g1 = glow(w, c1, 0.55) * 0.62 * curtains;
  float g2 = glow(w, c2, 0.4) * 0.45 * curtains;
  float g3 = glow(w, c3, 0.45) * 0.38;
  float g4 = glow(w, c4, 0.3) * 0.28;

  float amount = g1 + g2 + g3 + g4;
  vec3 tint = (uColorA * (g1 + g4) + uColorB * g2 + uColorC * g3) / max(amount, 0.001);
  vec3 color = mix(uBase, tint, clamp(amount, 0.0, 1.0) * uIntensity);

  // Grano muy leve para evitar bandas en el degradado.
  color += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.012;
  gl_FragColor = vec4(color, 1.0);
}
`

/**
 * "Hilos de luz" para el footer (inspirado en Ghost Fibers de React Bits, código propio):
 * hebras finas y sedosas que ondulan despacio en diagonal, con los mismos colores del hero.
 */
export const FIBERS_FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uBase;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uIntensity;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  float t = uTime * 0.12;

  vec3 light = vec3(0.0);
  for (int i = 0; i < 14; i++) {
    float fi = float(i);
    // Cada hebra: una onda suave que cruza en diagonal y se mece con el tiempo.
    float offset = (fi / 13.0 - 0.5) * 1.3;
    float wave = 0.22 * sin(p.x * (1.1 + 0.07 * fi) + t * (0.6 + 0.05 * fi) + fi * 1.9)
               + 0.08 * sin(p.x * 2.7 - t * 0.8 + fi * 0.7);
    float y = offset + wave + p.x * 0.28;
    float d = abs(p.y - y);

    // Núcleo fino + halo suave: el brillo "respira" en cada hebra.
    float px = 1.0 / uResolution.y; // grosor en píxeles reales del lienzo
    float width = px * (0.9 + 1.1 * (0.5 + 0.5 * sin(fi * 2.3 + t * 1.3)));
    float strand = exp(-d * d / (width * width)) * 0.55 + exp(-d * d / (width * width * 90.0)) * 0.16;
    strand *= 0.55 + 0.45 * sin(p.x * 1.6 + t * 0.9 + fi);

    vec3 tint = mix(uColorA, uColorB, 0.5 + 0.5 * sin(fi * 1.3));
    tint = mix(tint, uColorC, step(0.75, fract(fi * 0.37)));
    light += tint * strand;
  }

  // Más luz hacia la derecha, menos detrás del texto de la izquierda.
  float side = smoothstep(-0.9, 0.7, p.x);
  vec3 color = uBase + light * uIntensity * (0.35 + 0.65 * side);

  color += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.012;
  gl_FragColor = vec4(min(color, vec3(1.0)), 1.0);
}
`
