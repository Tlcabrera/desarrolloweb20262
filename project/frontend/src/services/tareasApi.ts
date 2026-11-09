import type { CambiosTarea, Tarea, TareaId } from '../types/tarea'

// Dirección base de la API. Viene del archivo .env; si no existe, usamos /api.
const URL_BASE = import.meta.env.VITE_API_URL ?? '/api'

/** Error con el código de estado HTTP y el mensaje que envió el servidor. */
export class ErrorApi extends Error {
  status: number

  constructor(status: number, mensaje: string) {
    super(mensaje)
    this.status = status
  }
}

/**
 * Hace la petición, revisa el código de estado y devuelve el JSON ya convertido.
 * Todos los componentes pasan por aquí: un solo lugar para manejar errores.
 */
async function solicitar<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  let respuesta: Response
  try {
    respuesta = await fetch(`${URL_BASE}${ruta}`, {
      ...opciones,
      // Solo enviamos Content-Type cuando hay cuerpo
      headers: opciones.body ? { 'Content-Type': 'application/json' } : undefined,
    })
  } catch {
    // fetch solo falla así cuando no hay respuesta: servidor apagado o sin red
    throw new ErrorApi(0, 'No se pudo conectar con el servidor')
  }

  if (respuesta.status === 204) return undefined as T // éxito sin cuerpo (DELETE)

  const cuerpo = await respuesta.json().catch(() => null)
  if (!respuesta.ok) {
    throw new ErrorApi(respuesta.status, cuerpo?.mensaje ?? `Error ${respuesta.status}`)
  }
  return cuerpo as T
}

/** Una función por cada endpoint de la API de tareas. */
export const tareasApi = {
  listar: () => solicitar<Tarea[]>('/tareas'),

  crear: (titulo: string) =>
    solicitar<Tarea>('/tareas', { method: 'POST', body: JSON.stringify({ titulo }) }),

  actualizar: (id: TareaId, cambios: CambiosTarea) =>
    solicitar<Tarea>(`/tareas/${id}`, { method: 'PATCH', body: JSON.stringify(cambios) }),

  eliminar: (id: TareaId) => solicitar<void>(`/tareas/${id}`, { method: 'DELETE' }),
}
