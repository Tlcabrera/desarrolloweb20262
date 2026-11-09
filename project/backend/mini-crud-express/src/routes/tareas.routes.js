// capa de rutas: metodo+url->controlador

const { Router }= require("express");

const controlador= require('../controllers/tareas.controller');

const { validarCreacion, validarCambios }= require('../middlewares/validarTarea');

const validarId = require('../middlewares/validarId');

const router= Router();

router.get('/',controlador.listar);
router.get('/:id', validarId, controlador.obtener);
router.post('/', validarCreacion, controlador.crear);
router.patch('/:id', validarId, validarCambios, controlador.actualizar);
router.delete('/:id', validarId, controlador.eliminar);

module.exports=router;