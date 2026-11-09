/**
 * El id es un número en la API en memoria y un texto (ObjectId) en la API con MongoDB.
 * Aceptamos ambos para que el frontend funcione con las dos versiones del backend.
 */
export type TareaId = number | string

/** Una tarea tal como la devuelve la API. */
export interface Tarea {
  id: TareaId
  titulo: string
  completada: boolean
}

/** Lo que se puede modificar con PATCH. */
export type CambiosTarea = Partial<Pick<Tarea, 'titulo' | 'completada'>>

/** Las tres pestañas del filtro. */
export type Filtro = 'todas' | 'pendientes' | 'completadas'
