import type { Producto } from '../types/producto';
import { TarjetaProducto } from './TarjetaProducto';
import './ListaProductos.css';

interface ListaProductosProps {
  productos: Producto[];
  idEditando: string | null;
  onEditar: (producto: Producto) => void;
  onEliminar: (producto: Producto) => void;
  onCambiarUnidades: (producto: Producto, cantidad: number) => void;
}

/**
 * Lista de tarjetas. No usa los callbacks: solo los REENVÍA a cada tarjeta.
 */
export function ListaProductos({ productos, idEditando, onEditar, onEliminar, onCambiarUnidades }: ListaProductosProps) {
  // Renderizado condicional con if + return: un caso completamente distinto
  if (productos.length === 0) {
    return <p className="vacio">No hay productos para mostrar.</p>;
  }

  return (
    <div className="lista">
      {/* map() convierte cada producto en una tarjeta. key ayuda a React a saber cuál cambió. */}
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto.id}
          producto={producto}
          estaEditando={producto.id === idEditando}
          onEditar={onEditar}
          onEliminar={onEliminar}
          onCambiarUnidades={onCambiarUnidades}
        />
      ))}
    </div>
  );
}
