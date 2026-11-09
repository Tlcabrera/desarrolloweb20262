import { useEffect, useState } from 'react'
import { tareasApi } from '../services/tareasApi'
import type { Tarea, TareaId } from '../types/tarea'

/** Convierte cualquier error en un texto para mostrar. */
function mensajeDe(error: unknown): string {
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado'
}

/**
 * HOOK PERSONALIZADO: concentra el estado de las tareas y las llamadas a la API.
 * Los componentes solo dibujan; la lógica vive aquí.
 */
export function useTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null) // error al cargar la lista
  const [aviso, setAviso] = useState<string | null>(null) // error al crear, editar o eliminar
  const [intento, setIntento] = useState(0) // cambiarlo vuelve a cargar

  // Cargar la lista al montar el componente (y cada vez que cambia "intento")
  useEffect(() => {
    let cancelado = false // evita actualizar el estado si el componente ya se desmontó
    tareasApi
      .listar()
      .then((datos) => {
        if (!cancelado) {
          setTareas(datos)
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (!cancelado) setError(mensajeDe(e))
      })
      .finally(() => {
        if (!cancelado) setCargando(false)
      })
    return () => {
      cancelado = true
    }
  }, [intento])

  function recargar() {
    setCargando(true)
    setIntento((n) => n + 1)
  }

  /** Crea la tarea. Devuelve true si funcionó (así el formulario sabe si limpiarse). */
  async function crear(titulo: string): Promise<boolean> {
    try {
      const nueva = await tareasApi.crear(titulo)
      setTareas((actuales) => [...actuales, nueva]) // usamos la tarea que devolvió el servidor
      setAviso(null)
      return true
    } catch (e) {
      setAviso(mensajeDe(e))
      return false
    }
  }

  async function alternar(tarea: Tarea) {
    try {
      const actualizada = await tareasApi.actualizar(tarea.id, { completada: !tarea.completada })
      setTareas((actuales) => actuales.map((t) => (t.id === actualizada.id ? actualizada : t)))
    } catch (e) {
      setAviso(mensajeDe(e))
    }
  }

  async function eliminar(id: TareaId) {
    try {
      await tareasApi.eliminar(id)
      setTareas((actuales) => actuales.filter((t) => t.id !== id))
    } catch (e) {
      setAviso(mensajeDe(e))
    }
  }

  return { tareas, cargando, error, aviso, cerrarAviso: () => setAviso(null), recargar, crear, alternar, eliminar }
}
