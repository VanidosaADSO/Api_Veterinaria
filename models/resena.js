const {Schema, model} = require('mongoose')

const ResenasSchema = Schema({
    Nombre: {
        type:String,
        require: [true, 'El nombre es un campo obligatorio']
    },
    Correo:{
        type:String,
        require: [true, 'El correo es un campo obligatorio']
    },
    Resena:{
        type:String,
        require:[true, 'La reseña es un campo obligatorio']
    },
    Estado: {
        type: Boolean,
        default:true
    }
})

module.exports =  model('Resena',ResenasSchema)