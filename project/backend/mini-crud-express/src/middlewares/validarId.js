const { isValidObjectId } = require('mongoose');
const HttpError = require('../utils/HttpError');

function validarId(req, res, next) {
    if (!isValidObjectId(req.params.id)) {
        throw next(new HttpError(400, `El id ${req.params.id} no tiene un formato válido`));
    }
    next();
}

module.exports = validarId;