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
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.03 } },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'movil', use: { ...devices['Pixel 7'] } },
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
