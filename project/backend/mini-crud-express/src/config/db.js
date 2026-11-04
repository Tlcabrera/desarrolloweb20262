// CONEXIÓN A MONGODB: se abre una sola vez, al encender el servidor.
const mongoose = require('mongoose');

async function conectarBaseDeDatos(uri) {
  // Si MongoDB no responde en 5 segundos, falla con un error claro.
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log(`Conectado a MongoDB: base "${mongoose.connection.name}"`);
}

module.exports = { conectarBaseDeDatos };