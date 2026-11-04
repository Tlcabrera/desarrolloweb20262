//red de seguridad: convertir cualquier error en un response json.delete('/', (req, res) => {
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
    console.error(error);
        res.status(500).json({error: 'Error interno del servidor'});
    }

    module.exports = {
        rutaNoEncontrada,
        manejarErrores
    };