// CAPA DE SERVICIOS: ahora los datos viven en MongoDB. Todas las funciones son async.
const Tarea = require('../models/tarea.model');
const HttpError = require('../utils/HttpError');

async function listar() {
  return Tarea.find().sort({ createdAt: 1 }); // de la más antigua a la más nueva
}

async function obtener(id) {
  const tarea = await Tarea.findById(id);
  if (!tarea) {
    throw new HttpError(404, `No existe la tarea ${id}`);
  }
  return tarea;
}

async function crear(titulo) {
  return Tarea.create({ titulo }); // MongoDB genera el _id
}

async function actualizar(id, cambios) {
  const tarea = await Tarea.findByIdAndUpdate(id, cambios, {
    returnDocument: 'after', // devuelve la tarea YA modificada
    runValidators: true, // aplica las reglas del modelo también al modificar
  });
  if (!tarea) {
    throw new HttpError(404, `No existe la tarea ${id}`);
  }
  return tarea;
}

async function eliminar(id) {
  const tarea = await Tarea.findByIdAndDelete(id);
  if (!tarea) {
    throw new HttpError(404, `No existe la tarea ${id}`);
  }
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
