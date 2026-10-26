import { useState } from 'react';
import { Alerta, type MensajeAlerta } from '../components/Alerta';
import { BarraFiltros, type FiltroCategoria } from '../components/BarraFiltros';
import { ListaProductos } from '../components/ListaProductos';
import { ProductoFormulario } from '../components/ProductoFormulario';
import { ResumenMenu } from '../components/ResumenMenu';
import { productosIniciales } from '../data/productosIniciales';
import { UNIDADES_MINIMAS, type Producto, type ProductoDatos } from '../types/producto';
import './MenuPage.css';

/**
 * PÁGINA PRINCIPAL: aquí VIVE EL ESTADO.
 * La página no dibuja tarjetas: guarda los datos y se los entrega a sus hijos por props.
 * Todo ocurre en la memoria del navegador: si recargas la página, los cambios se pierden.
 */
export function MenuPage() {
  // ---------- Estado ----------
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);
  const [mensaje, setMensaje] = useState<MensajeAlerta | null>(null);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<FiltroCategoria>('Todas');
  const [soloPocasUnidades, setSoloPocasUnidades] = useState(false);

  // ---------- Crear y editar ----------
  function iniciarEdicion(producto: Producto) {
    setMensaje(null);
    setProductoEditando(producto);
  }

  function guardarProducto(datos: ProductoDatos): boolean {
    // Regla de negocio: el nombre no se puede repetir (excepto el del producto que editamos)
    const nombreRepetido = productos.some(
      (producto) =>
        producto.nombre.toLowerCase() === datos.nombre.toLowerCase() && producto.id !== productoEditando?.id,
    );
    if (nombreRepetido) {
      setMensaje({
        tipo: 'error',
        texto: 'No se pudo guardar el producto',
        detalles: [`Ya existe un producto llamado "${datos.nombre}".`],
      });
      return false;
    }

    if (productoEditando) {
      // EDITAR: combinamos el original con los datos nuevos y reemplazamos solo ese con map
      const actualizado: Producto = { ...productoEditando, ...datos };
      setProductos(productos.map((producto) => (producto.id === actualizado.id ? actualizado : producto)));
      setProductoEditando(null);
      setMensaje({ tipo: 'exito', texto: `Producto "${actualizado.nombre}" actualizado.` });
    } else {
      // CREAR: arreglo NUEVO con el producto nuevo de primero (nunca productos.push)
      const nuevo: Producto = { ...datos, id: crypto.randomUUID() };
      setProductos([nuevo, ...productos]);
      setMensaje({ tipo: 'exito', texto: `Producto "${nuevo.nombre}" agregado al menú.` });
    }
    return true;
  }

  // ---------- Eliminar ----------
  function eliminarProducto(producto: Producto) {
    const confirmado = window.confirm(`¿Eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`);
    if (!confirmado) return;

    // ELIMINAR: filter crea un arreglo nuevo sin ese producto
    setProductos(productos.filter((item) => item.id !== producto.id));
    if (productoEditando?.id === producto.id) {
      setProductoEditando(null);
    }
    setMensaje({ tipo: 'exito', texto: `Producto "${producto.nombre}" eliminado.` });
  }

  // ---------- Ajustar unidades ----------
  function cambiarUnidades(producto: Producto, cantidad: number) {
    const nuevasUnidades = producto.unidades + cantidad;
    if (nuevasUnidades < 0) return;
    // MODIFICAR: map + spread crea un objeto nuevo solo para el producto que cambia
    setProductos(productos.map((item) => (item.id === producto.id ? { ...item, unidades: nuevasUnidades } : item)));
  }

  function limpiarFiltros() {
    setBusqueda('');
    setCategoriaFiltro('Todas');
  }

  // ---------- Valores derivados (NO son estado: se recalculan en cada render) ----------
  const textoBuscado = busqueda.trim().toLowerCase();
  const productosVisibles = productos.filter((producto) => {
    const coincideTexto = producto.nombre.toLowerCase().includes(textoBuscado);
    const coincideCategoria = categoriaFiltro === 'Todas' || producto.categoria === categoriaFiltro;
    const coincideUnidades = !soloPocasUnidades || producto.unidades <= UNIDADES_MINIMAS;
    return coincideTexto && coincideCategoria && coincideUnidades;
  });

  return (
    <main className="contenedor" id="menu">
      {/* Renderizado condicional: la alerta solo existe si hay mensaje */}
      {mensaje && <Alerta mensaje={mensaje} onCerrar={() => setMensaje(null)} />}

      <ResumenMenu productos={productos} />

      <div className="menu">
        <section className="panel panel--formulario">
          {/* Cuando la key cambia, React crea un formulario NUEVO con los datos del producto elegido */}
          <ProductoFormulario
            key={productoEditando?.id ?? 'nuevo'}
            productoInicial={productoEditando}
            onGuardar={guardarProducto}
            onCancelar={() => setProductoEditando(null)}
          />
        </section>

        <section className="panel">
          <div className="panel__cabecera">
            <h2 className="panel__titulo">Nuestro menú</h2>
            <span className="panel__contador">
              {productosVisibles.length} de {productos.length}
            </span>
            <button
              type="button"
              className="boton boton--secundario boton--pequeno"
              onClick={() => setSoloPocasUnidades(!soloPocasUnidades)}
            >
              {soloPocasUnidades ? 'Ver todos' : 'Ver solo pocas unidades'}
            </button>
          </div>

          <BarraFiltros
            busqueda={busqueda}
            categoria={categoriaFiltro}
            onBusquedaChange={setBusqueda}
            onCategoriaChange={setCategoriaFiltro}
            onLimpiar={limpiarFiltros}
          />

          <ListaProductos
            productos={productosVisibles}
            idEditando={productoEditando?.id ?? null}
            onEditar={iniciarEdicion}
            onEliminar={eliminarProducto}
            onCambiarUnidades={cambiarUnidades}
          />
        </section>
      </div>
    </main>
  );
}
