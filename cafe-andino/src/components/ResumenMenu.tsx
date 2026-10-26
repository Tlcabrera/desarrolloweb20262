import { UNIDADES_MINIMAS, type Producto } from '../types/producto';
import { formatearPrecio } from '../utils/formato';
import './ResumenMenu.css';

interface ResumenMenuProps {
  productos: Producto[];
}

/** Cuatro indicadores calculados a partir de la lista de productos. */
export function ResumenMenu({ productos }: ResumenMenuProps) {
  // VALORES DERIVADOS: se calculan en cada render a partir de las props.
  // No se guardan en otro estado, porque podrían quedar desincronizados.
  const totalProductos = productos.length;
  const totalUnidades = productos.reduce((suma, producto) => suma + producto.unidades, 0);
  const ventaPosible = productos.reduce((suma, producto) => suma + producto.precio * producto.unidades, 0);
  const conPocasUnidades = productos.filter((producto) => producto.unidades <= UNIDADES_MINIMAS).length;

  return (
    <section className="resumen" aria-label="Resumen del menú">
      <article className="resumen__tarjeta">
        <span className="resumen__etiqueta">Productos</span>
        <strong className="resumen__valor">{totalProductos}</strong>
      </article>
      <article className="resumen__tarjeta">
        <span className="resumen__etiqueta">Unidades disponibles</span>
        <strong className="resumen__valor">{totalUnidades}</strong>
      </article>
      <article className="resumen__tarjeta">
        <span className="resumen__etiqueta">Venta posible hoy</span>
        <strong className="resumen__valor">{formatearPrecio(ventaPosible)}</strong>
      </article>
      {/* Clase condicional: la tarjeta se pinta de amarillo si hay productos con pocas unidades */}
      <article className={`resumen__tarjeta ${conPocasUnidades > 0 ? 'resumen__tarjeta--alerta' : ''}`}>
        <span className="resumen__etiqueta">Pocas unidades (≤ {UNIDADES_MINIMAS})</span>
        <strong className="resumen__valor">{conPocasUnidades}</strong>
      </article>
    </section>
  );
}
