import { useState, type ChangeEvent, type FormEvent } from 'react';
import { CATEGORIAS, type Producto, type ProductoDatos } from '../types/producto';
import {
  VALORES_INICIALES,
  convertirAProductoDatos,
  validarFormulario,
  type ErroresFormulario,
  type ValoresFormulario,
} from '../utils/validarProducto';
import './ProductoFormulario.css';

interface ProductoFormularioProps {
  /** null = crear un producto nuevo; un producto = editar ese producto */
  productoInicial: Producto | null;
  /** Devuelve true si la página lo guardó correctamente */
  onGuardar: (datos: ProductoDatos) => boolean;
  onCancelar: () => void;
}

/** Convierte un producto (números) en valores del formulario (texto). */
function obtenerValoresIniciales(producto: Producto | null): ValoresFormulario {
  if (!producto) return VALORES_INICIALES;
  return {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    categoria: producto.categoria,
    precio: String(producto.precio),
    unidades: String(producto.unidades),
  };
}

/**
 * Formulario para crear o editar un producto.
 * Todos los campos son INPUTS CONTROLADOS: su valor vive en el estado `valores`.
 */
export function ProductoFormulario({ productoInicial, onGuardar, onCancelar }: ProductoFormularioProps) {
  // HOOKS: siempre al inicio del componente, nunca dentro de un if o un ciclo.
  const [valores, setValores] = useState<ValoresFormulario>(() => obtenerValoresIniciales(productoInicial));
  const [errores, setErrores] = useState<ErroresFormulario>({});

  const esEdicion = productoInicial !== null;

  // UN SOLO MANEJADOR para todos los campos: usa el atributo "name" del input.
  function manejarCambio(evento: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = evento.target;
    setValores({ ...valores, [name]: value }); // copiamos el objeto y cambiamos UN campo
    setErrores({ ...errores, [name]: undefined }); // quitamos el error del campo que se corrige
  }

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault(); // evita que el navegador recargue la página

    const erroresEncontrados = validarFormulario(valores);
    setErrores(erroresEncontrados);
    if (Object.keys(erroresEncontrados).length > 0) {
      return; // hay errores: no enviamos nada
    }

    // EVENTO QUE SUBE: le avisamos al padre con los datos ya convertidos a números
    const guardado = onGuardar(convertirAProductoDatos(valores));
    if (guardado && !esEdicion) {
      setValores(VALORES_INICIALES); // limpiamos el formulario después de crear
    }
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <h2 className="panel__titulo">{esEdicion ? `Editar: ${productoInicial.nombre}` : 'Nuevo producto'}</h2>

      <div className="campo">
        {/* htmlFor (no "for") une la etiqueta con el input que tiene el mismo id */}
        <label htmlFor="nombre" className="campo__etiqueta">
          Nombre *
        </label>
        <input
          id="nombre"
          name="nombre"
          className={`campo__control ${errores.nombre ? 'campo__control--error' : ''}`}
          placeholder="Arepa de choclo"
          value={valores.nombre}
          onChange={manejarCambio}
        />
        {errores.nombre && <span className="campo__error">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label htmlFor="categoria" className="campo__etiqueta">
          Categoría *
        </label>
        <select
          id="categoria"
          name="categoria"
          className={`campo__control ${errores.categoria ? 'campo__control--error' : ''}`}
          value={valores.categoria}
          onChange={manejarCambio}
        >
          <option value="">Selecciona...</option>
          {CATEGORIAS.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        {errores.categoria && <span className="campo__error">{errores.categoria}</span>}
      </div>

      <div className="formulario__fila">
        <div className="campo">
          <label htmlFor="precio" className="campo__etiqueta">
            Precio (COP) *
          </label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            step="any"
            className={`campo__control ${errores.precio ? 'campo__control--error' : ''}`}
            placeholder="6500"
            value={valores.precio}
            onChange={manejarCambio}
          />
          {errores.precio && <span className="campo__error">{errores.precio}</span>}
        </div>

        <div className="campo">
          <label htmlFor="unidades" className="campo__etiqueta">
            Unidades *
          </label>
          <input
            id="unidades"
            name="unidades"
            type="number"
            min="0"
            step="1"
            className={`campo__control ${errores.unidades ? 'campo__control--error' : ''}`}
            placeholder="10"
            value={valores.unidades}
            onChange={manejarCambio}
          />
          {errores.unidades && <span className="campo__error">{errores.unidades}</span>}
        </div>
      </div>

      <div className="campo">
        <label htmlFor="descripcion" className="campo__etiqueta">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={3}
          className={`campo__control ${errores.descripcion ? 'campo__control--error' : ''}`}
          placeholder="Detalles opcionales del producto"
          value={valores.descripcion}
          onChange={manejarCambio}
        />
        <span className="campo__ayuda">{valores.descripcion.length}/150</span>
        {errores.descripcion && <span className="campo__error">{errores.descripcion}</span>}
      </div>

      <div className="formulario__botones">
        <button type="submit" className="boton boton--primario">
          {esEdicion ? 'Guardar cambios' : 'Agregar producto'}
        </button>
        {esEdicion && (
          <button type="button" className="boton boton--secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
