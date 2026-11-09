import { useState } from 'react'
import { Aviso } from './components/Aviso'
import { Encabezado } from './components/Encabezado'
import { FiltroTareas } from './components/FiltroTareas'
import { FormularioTarea } from './components/FormularioTarea'
import { ListaTareas } from './components/ListaTareas'
import { useTareas } from './hooks/useTareas'
import type { Filtro, Tarea } from './types/tarea'

/** Página principal: une el hook con los componentes. */
export default function App() {
  const { tareas, cargando, error, aviso, cerrarAviso, recargar, crear, alternar, eliminar } = useTareas()
  const [filtro, setFiltro] = useState<Filtro>('todas')

  // Valores derivados: se calculan en cada render, no se guardan en el estado
  const pendientes = tareas.filter((t) => !t.completada).length
  const visibles = tareas.filter((t) =>
    filtro === 'todas' ? true : filtro === 'pendientes' ? !t.completada : t.completada,
  )

  function confirmarEliminar(tarea: Tarea) {
    if (window.confirm(`¿Eliminar "${tarea.titulo}"?`)) eliminar(tarea.id)
  }

  return (
    <main className="pagina">
      <section className="tarjeta">
        <Encabezado pendientes={pendientes} total={tareas.length} />
        <FormularioTarea onCrear={crear} />

        {aviso && <Aviso accion={{ texto: 'Cerrar', onClick: cerrarAviso }}>{aviso}</Aviso>}

        {cargando ? (
          <p className="estado" role="status">
            Cargando tareas…
          </p>
        ) : error ? (
          <Aviso accion={{ texto: 'Reintentar', onClick: recargar }}>{error}</Aviso>
        ) : (
          <>
            <FiltroTareas filtro={filtro} onCambiar={setFiltro} />
            <ListaTareas tareas={visibles} onAlternar={alternar} onEliminar={confirmarEliminar} />
          </>
        )}
      </section>
    </main>
  )
}
