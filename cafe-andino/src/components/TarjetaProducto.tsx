import type { Producto } from '../types/producto';
import { EMOJI_CATEGORIA, formatearPrecio, obtenerEstadoUnidades } from '../utils/formato';
import './TarjetaProducto.css';

interface TarjetaProductoProps {
  producto: Producto;
  estaEditando: boolean;
  onEditar: (producto: Producto) => void;
  onEliminar: (producto: Producto) => void;
  onCambiarUnidades: (producto: Producto, cantidad: number) => void;
}

const TEXTO_ESTADO = {
  agotado: 'Agotado',
  pocas: 'Pocas unidades',
  disponible: 'Disponible',
};

/**
 * Componente REUTILIZABLE: se escribe una vez y se usa una vez por producto.
 * Los datos BAJAN por props; las acciones SUBEN llamando a los callbacks.
 */
export function TarjetaProducto({ producto, estaEditando, onEditar, onEliminar, onCambiarUnidades }: TarjetaProductoProps) {
  const estado = obtenerEstadoUnidades(producto.unidades);

  return (
    <article className={`tarjeta ${estaEditando ? 'tarjeta--editando' : ''}`}>
      <span className={`etiqueta etiqueta--${estado}`}>{TEXTO_ESTADO[estado]}</span>

      <div className="tarjeta__emoji" aria-hidden="true">
        {EMOJI_CATEGORIA[producto.categoria]}
      </div>
      <h3 className="tarjeta__nombre">{producto.nombre}</h3>
      <p className="tarjeta__categoria">{producto.categoria}</p>
      {/* Renderizado condicional: la descripción solo aparece si existe */}
      {producto.descripcion && <p className="tarjeta__descripcion">{producto.descripcion}</p>}
      <p className="tarjeta__precio">{formatearPrecio(producto.precio)}</p>

      <div className="unidades">
        {/* Eventos: ENTREGAR una función flecha, no ejecutar la función */}
        <button
          type="button"
          className="boton-icono"
          aria-label={`Restar una unidad a ${producto.nombre}`}
          disabled={producto.unidades === 0}
          onClick={() => onCambiarUnidades(producto, -1)}
        >
          −
        </button>
        <span className="unidades__cantidad">{producto.unidades}</span>
        <button
          type="button"
          className="boton-icono"
          aria-label={`Sumar una unidad a ${producto.nombre}`}
          onClick={() => onCambiarUnidades(producto, 1)}
        >
          +
        </button>
      </div>

      <div className="tarjeta__acciones">
        <button type="button" className="boton boton--secundario boton--pequeno" onClick={() => onEditar(producto)}>
          Editar
        </button>
        <button type="button" className="boton boton--peligro boton--pequeno" onClick={() => onEliminar(producto)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}
