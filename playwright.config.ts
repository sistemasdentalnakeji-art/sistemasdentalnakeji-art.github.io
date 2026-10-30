import { defineConfig, devices } from '@playwright/test'

// Dos perfiles: escritorio y celular. El servidor de desarrollo usa un endpoint falso; las pruebas lo interceptan.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5199',
    colorScheme: 'light',
    reducedMotion: 'reduce',
  },
  // Las capturas de página completa en 1080p y 2K tardan varios segundos cada una: más tiempo para que salgan dos iguales.
  timeout: 90_000,
  expect: { timeout: 30_000, toHaveScreenshot: { maxDiffPixelRatio: 0.03 } },
  // Un perfil por tipo de pantalla. Las pruebas de capturas (pantallas.spec.ts) corren en todos; antes de publicar:
  // `npx playwright test pantallas -g "Pantallas principales"` y revisar las diferencias.
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'movil', use: { ...devices['Pixel 7'] } },
    { name: 'movil-chico', use: { ...devices['Pixel 7'], viewport: { width: 360, height: 740 } } },
    { name: 'tableta', use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: 'laptop', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } } },
    { name: 'fullhd', use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } } },
    { name: '2k', use: { ...devices['Desktop Chrome'], viewport: { width: 2560, height: 1440 } } },
  ],
  webServer: {
    command: 'npm run dev -- --port 5199 --strictPort',
    url: 'http://localhost:5199/en/',
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      VITE_BOOKING_ENDPOINT: 'https://script.google.com/macros/s/PRUEBA/exec',
      VITE_TURNSTILE_SITE_KEY: 'llave-de-prueba',
    },
  },
})
