const { Schema, model } = require('mongoose')

const AgendaSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre de la agenda es obligatorio']
    },
    Disponibilidad: {
        type: String,
        required: [true, 'La disponibilidad es obligatoria ']

    }, Estado: {
        type: Boolean,
        default: true
    }
})


module.exports = model('Agenda', AgendaSchema)