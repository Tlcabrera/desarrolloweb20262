// Configurar express app.use le de un orden para cada peticion

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const documentacion = require("./docs/openapi");
const tareasRouter=require('./routes/tareas.routes');
const { rutaNoEncontrada, manejarErrores } = require('./middlewares/manejarErrores');

const app = express();
// 1.convertir el cuerpo json de la peticion req.body
app.use(express.json());

//2. Documentacion de la API
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(documentacion));
app.get('api/docs.json', (req, res) => res.json(documentacion));

//3. Rutas
app.get('/api/salud', (req, res) => {
    res.json({ estado: "ok" });
});

app.use('/api/tareas',tareasRouter);

//4. si no responde la ruta 404 Json
app.use(rutaNoEncontrada);
//5. manejar errores
app.use(manejarErrores);


module.exports = app;




