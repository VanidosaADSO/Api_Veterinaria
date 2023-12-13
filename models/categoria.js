const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio.']
    },
    Estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Categoria', CategoriaSchema)