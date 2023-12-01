const { Schema, model } = require('mongoose')

const servicioSchema = Schema({
    Nombre:{
        type:String,
        required: [true, 'El nombre es un campo obligatorio'],
    },
    Descripcion:{
        type:String,
        required: [true, 'La descripciones un campo obligatorio'],
    }
})

module.exports = model('Servicio', servicioSchema)