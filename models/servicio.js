const { Schema, model } = require('mongoose')

const servicioSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es un campo obligatorio'],
    },
    Descripcion: {
        type: String,
        required: [true, 'La descripciones un campo obligatorio'],
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es un campo obligatorio']
    },
    Categoria: {
        type: String,
        required: [true, 'La categoria es un campo obligatorio ']
    },
    Estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Servicio', servicioSchema)