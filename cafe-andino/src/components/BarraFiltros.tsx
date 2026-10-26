import { CATEGORIAS, type Categoria } from '../types/producto';
import './BarraFiltros.css';

export type FiltroCategoria = Categoria | 'Todas';

interface BarraFiltrosProps {
  busqueda: string;
  categoria: FiltroCategoria;
  onBusquedaChange: (texto: string) => void;
  onCategoriaChange: (categoria: FiltroCategoria) => void;
  onLimpiar: () => void;
}

/**
 * COMPONENTE CONTROLADO: no tiene estado propio.
 * Recibe los valores por props y avisa al padre cada vez que el usuario los cambia.
 */
export function BarraFiltros({ busqueda, categoria, onBusquedaChange, onCategoriaChange, onLimpiar }: BarraFiltrosProps) {
  // Valor derivado: ¿hay algún filtro activo?
  const hayFiltros = busqueda !== '' || categoria !== 'Todas';

  return (
    <div className="filtros">
      <input
        type="search"
        className="campo__control"
        placeholder="Buscar por nombre..."
        aria-label="Buscar producto"
        value={busqueda}
        onChange={(evento) => onBusquedaChange(evento.target.value)}
      />
      <select
        className="campo__control"
        aria-label="Filtrar por categoría"
        value={categoria}
        onChange={(evento) => onCategoriaChange(evento.target.value as FiltroCategoria)}
      >
        <option value="Todas">Todas las categorías</option>
        {CATEGORIAS.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
      {/* Reto de la sesión 2: el botón solo aparece si hay filtros activos */}
      {hayFiltros && (
        <button type="button" className="boton boton--secundario" onClick={onLimpiar}>
          Limpiar
        </button>
      )}
    </div>
  );
}
