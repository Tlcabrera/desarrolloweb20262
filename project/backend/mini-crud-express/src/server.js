// encender servidor
const app = require('./app');

const PUERTO=3000;
app.listen(PUERTO,()=>{
    console.log(`API tareas en http://localhost:${PUERTO}/api/tareas`);
});