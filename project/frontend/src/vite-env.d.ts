/// <reference types="vite/client" />

// Variables de entorno que usa la app (todas deben empezar por VITE_)
interface ImportMetaEnv {
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
