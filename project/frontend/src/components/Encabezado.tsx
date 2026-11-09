interface EncabezadoProps {
  pendientes: number
  total: number
}

/** Título de la app y contador de tareas pendientes. */
export function Encabezado({ pendientes, total }: EncabezadoProps) {
  return (
    <header className="encabezado">
      <h1 className="encabezado__titulo">Mis tareas</h1>
      <p className="encabezado__contador" aria-live="polite">
        {total === 0 ? 'Sin tareas' : `${pendientes} ${pendientes === 1 ? 'pendiente' : 'pendientes'} de ${total}`}
      </p>
    </header>
  )
}
