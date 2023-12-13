const { Schema, model } = require('mongoose')

const ResenasSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es un campo obligatorio']
    },
    Correo: {
        type: String,
        required: [true, 'El correo es un campo obligatorio']
    },
    Resena: {
        type: String,
        required: [true, 'La reseña es un campo obligatorio']
    }, 
    imagen: {
        type: String,
        required: [true, 'La imagen es un campo obligatorio']
    },
    Estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Resena', ResenasSchema)