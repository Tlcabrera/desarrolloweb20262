// Se ejecuta antes de cada archivo de pruebas.
import '@testing-library/jest-dom/vitest' // agrega toBeInTheDocument, toBeChecked, etc.
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup() // desmonta lo que se dibujó en la prueba anterior
  vi.restoreAllMocks() // quita los fetch simulados
})
