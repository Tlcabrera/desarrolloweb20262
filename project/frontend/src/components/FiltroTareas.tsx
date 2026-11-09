import type { Filtro } from '../types/tarea'

interface FiltroTareasProps {
  filtro: Filtro
  onCambiar: (filtro: Filtro) => void
}

const OPCIONES: { valor: Filtro; texto: string }[] = [
  { valor: 'todas', texto: 'Todas' },
  { valor: 'pendientes', texto: 'Pendientes' },
  { valor: 'completadas', texto: 'Completadas' },
]

/** Botones para elegir qué tareas se ven. */
export function FiltroTareas({ filtro, onCambiar }: FiltroTareasProps) {
  return (
    <div className="filtro" role="group" aria-label="Filtrar tareas">
      {OPCIONES.map((opcion) => (
        <button
          key={opcion.valor}
          type="button"
          className="filtro__opcion"
          aria-pressed={filtro === opcion.valor}
          onClick={() => onCambiar(opcion.valor)}
        >
          {opcion.texto}
        </button>
      ))}
    </div>
  )
}
