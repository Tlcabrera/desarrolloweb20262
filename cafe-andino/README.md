# ☕ Café Andino v2 — React + TypeScript + Vite

Administrador del menú de una cafetería. Ejemplo de clase que cubre las temáticas de las
sesiones 1 y 2 (componentes, props, TypeScript, estado, formularios y CRUD).

## Ejecutar

Requisito: Node.js 20.19 o superior (recomendado 22 LTS). Verifica con `node -v`.

```bash
cd cafe-andino
npm install
npm run dev        # http://localhost:5173
npm run build      # revisa tipos con tsc y genera dist/
```

## Estructura

```
src/
├── main.tsx                    punto de entrada
├── App.tsx                     layout: Header + Hero + MenuPage + Footer
├── index.css                   variables CSS, botones y campos
├── types/producto.ts           interface Producto, Categoria (as const), ProductoDatos (Omit)
├── data/productosIniciales.ts  6 productos de ejemplo
├── utils/formato.ts            formatearPrecio, obtenerEstadoUnidades, EMOJI_CATEGORIA (Record)
├── utils/validarProducto.ts    validación (función pura) y conversión texto → número
├── components/
│   ├── Header.tsx / Hero.tsx / Footer.tsx       props tipadas, prop opcional, valor por defecto
│   ├── ResumenMenu.tsx                         valores derivados
│   ├── ListaProductos.tsx / TarjetaProducto.tsx map + key, condicionales, callbacks
│   ├── Alerta.tsx                              componente reutilizable
│   ├── ProductoFormulario.tsx                  inputs controlados, preventDefault, errores por campo
│   └── BarraFiltros.tsx                        componente controlado + "Limpiar filtros"
└── pages/MenuPage.tsx          estado (useState) y CRUD inmutable
```

## Datos esperados al iniciar

6 productos · 69 unidades · venta posible $ 327.000 · 3 con pocas unidades (≤ 5).

Cada archivo tiene comentarios en español que explican los conceptos.
El libreto de clase con la explicación paso a paso está en el documento compartido.
