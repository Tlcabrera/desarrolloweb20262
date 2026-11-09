import type { Tarea } from '../types/tarea'

interface TareaItemProps {
  tarea: Tarea
  onAlternar: (tarea: Tarea) => void
  onEliminar: (tarea: Tarea) => void
}

/** Una fila de la lista: casilla para completar, título y botón para eliminar. */
export function TareaItem({ tarea, onAlternar, onEliminar }: TareaItemProps) {
  const idCasilla = `tarea-${tarea.id}`
  return (
    <li className={tarea.completada ? 'tarea tarea--completada' : 'tarea'}>
      <input
        id={idCasilla}
        type="checkbox"
        className="tarea__casilla"
        checked={tarea.completada}
        onChange={() => onAlternar(tarea)}
      />
      <label htmlFor={idCasilla} className="tarea__titulo">
        {tarea.titulo}
      </label>
      <button
        type="button"
        className="boton boton--icono"
        aria-label={`Eliminar "${tarea.titulo}"`}
        onClick={() => onEliminar(tarea)}
      >
        ✕
      </button>
    </li>
  )
}
