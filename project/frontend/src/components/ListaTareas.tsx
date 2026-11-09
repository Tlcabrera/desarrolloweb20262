import type { Tarea } from '../types/tarea'
import { TareaItem } from './TareaItem'

interface ListaTareasProps {
  tareas: Tarea[]
  onAlternar: (tarea: Tarea) => void
  onEliminar: (tarea: Tarea) => void
}

/** La lista de tareas, o un mensaje si está vacía. */
export function ListaTareas({ tareas, onAlternar, onEliminar }: ListaTareasProps) {
  if (tareas.length === 0) {
    return <p className="vacio">No hay tareas para mostrar.</p>
  }
  return (
    <ul className="lista" aria-label="Lista de tareas">
      {tareas.map((tarea) => (
        <TareaItem key={tarea.id} tarea={tarea} onAlternar={onAlternar} onEliminar={onEliminar} />
      ))}
    </ul>
  )
}
