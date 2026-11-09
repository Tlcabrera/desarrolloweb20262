// modelo de la coleccion de tareas, para usar con mongoose

const { Schema, model } = require('mongoose');

const tareaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, "El titulo es obligatorio"],
        trim: true,
        minlength: [3, "El titulo debe tener al menos 3 caracteres"],
    },
    completada: {
        type: Boolean,
        default: false,
    },
}, 
{
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform: (documento, objeto) => {
            objeto.id = objeto._id.toString();
            delete objeto._id;
            return objeto;
        }
    },
});

module.exports = model("Tarea", tareaSchema);