//pto de entrada que conecta a mongoose y enciende el servidor
require('dotenv').config({ quiet: true });
// encender servidor
const app = require('./app');
const { conectarBaseDeDatos } = require('./config/db');
const PUERTO = process.env.PUERTO || 3000;

async function iniciar() {
    if (!process.env.MONGO_URI) {
        console.error("No se ha definido la variable de entorno MONGO_URI");
        process.exit(1);
    }
    try {
        await conectarBaseDeDatos(process.env.MONGO_URI);
        app.listen(PUERTO, () => {
            console.log(`API tareas en http://localhost:${PUERTO}/api/tareas`);
            console.log(`Documentacion en http://localhost:${PUERTO}/api/docs`);
        });
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error.message);
        console.error("Asegúrese de que MongoDB esté en ejecución y que la URI sea correcta.");
        process.exit(1);
    }
}

iniciar();