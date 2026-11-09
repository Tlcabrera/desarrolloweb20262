//red de seguridad: convertir cualquier error en un response json.delete('/', (req, res) => {
const mongoose = require('mongoose');
    const HttpError = require('../utils/HttpError');

function rutaNoEncontrada(requ,res,next){
    next(new HttpError(404,`La ruta ${req.method} ${req.originalUrl} no existe`));
}

function manejarErrores(error,req,res,next){
    if(error instanceof HttpError){
        res.status(error.status).json({error: error.message});
    }
    if(error instanceof SyntaxError && 'body' in error){
        return res.status(400).json({error: 'JSON inválido'});
    }
    if (error instanceof mongoose.Error.ValidationError){
        const errores = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({mensaje: 'Datos invalidos', errores});
    }
    if (error instanceof mongoose.Error.CastError){
        return res.status(400).json({mensaje: `EL valor "${error.value}" no es válido para el campo `});
    }
    console.error(error);
        res.status(500).json({error: 'Error interno del servidor'});
    }

    module.exports = {
        rutaNoEncontrada,
        manejarErrores
    };