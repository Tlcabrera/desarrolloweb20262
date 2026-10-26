import { CATEGORIAS, type Categoria, type ProductoDatos } from '../types/producto';

/**
 * Valores del formulario.
 * Los inputs HTML SIEMPRE entregan texto, por eso precio y unidades son string aquí.
 * Al enviar los convertimos a número (ver convertirAProductoDatos).
 */
export interface ValoresFormulario {
  nombre: string;
  descripcion: string;
  categoria: Categoria | ''; // '' = todavía no ha elegido
  precio: string;
  unidades: string;
}

/** Un mensaje de error opcional por cada campo del formulario. */
export type ErroresFormulario = Partial<Record<keyof ValoresFormulario, string>>;

export const VALORES_INICIALES: ValoresFormulario = {
  nombre: '',
  descripcion: '',
  categoria: '',
  precio: '',
  unidades: '',
};

/**
 * FUNCIÓN PURA: recibe valores y devuelve errores.
 * No toca el estado ni la pantalla, por eso es fácil de entender y de probar.
 */
export function validarFormulario(valores: ValoresFormulario): ErroresFormulario {
  const errores: ErroresFormulario = {};

  const nombre = valores.nombre.trim();
  if (nombre.length < 3 || nombre.length > 60) {
    errores.nombre = 'El nombre debe tener entre 3 y 60 caracteres';
  }

  if (valores.descripcion.length > 150) {
    errores.descripcion = 'Máximo 150 caracteres';
  }

  if (!(CATEGORIAS as readonly string[]).includes(valores.categoria)) {
    errores.categoria = 'Selecciona una categoría';
  }

  // Ojo: Number('') devuelve 0. Por eso primero revisamos si el campo está vacío.
  const precio = Number(valores.precio);
  if (valores.precio.trim() === '' || Number.isNaN(precio) || precio <= 0) {
    errores.precio = 'Ingresa un precio mayor que 0';
  }

  const unidades = Number(valores.unidades);
  if (valores.unidades.trim() === '' || !Number.isInteger(unidades) || unidades < 0) {
    errores.unidades = 'Ingresa un número entero mayor o igual a 0';
  }

  return errores;
}

/** Convierte los valores del formulario (texto) en datos de producto (con números). */
export function convertirAProductoDatos(valores: ValoresFormulario): ProductoDatos {
  return {
    nombre: valores.nombre.trim(),
    descripcion: valores.descripcion.trim(),
    categoria: valores.categoria as Categoria, // ya validamos que no está vacía
    precio: Number(valores.precio),
    unidades: Number(valores.unidades),
  };
}
