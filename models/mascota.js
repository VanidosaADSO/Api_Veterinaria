const { Schema, model } = require('mongoose')

const MascotaSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es un campo obligatorio']
    },
    Tipo: {
        type: String,
        required: [true, 'El tipo es un campo obligatorio']
    },
    Raza:{
        type: String,
        required: [true, 'La raza  es un campo obligatorio']
    },
    Edad:{
        type:Number,
        required: [true, 'La edad es un campo obligatorio']
    },
    Color:{
        type:String,
        required: [true, 'El color es un campo obligatorio']
    },
    Dueno:{
        type:String,
        required: [true, 'El dueno es un campo obligatorio']
    }

})

module.exports = model('Mascota', MascotaSchema)