/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL de la aplicación web de Google Apps Script que crea las citas en Google Calendar. */
  readonly VITE_BOOKING_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
