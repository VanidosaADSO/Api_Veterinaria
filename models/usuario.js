const {Schema, model} = require('mongoose')

const usuarioSchema = Schema({
    Nombre:{
        type: String,
        required:[true, 'El nombre es un campo obligatorio']
    },
    Apellido:{
        type: String,
        required:[true, 'El apellido es un campo obligatorio']
    },
    Documento:{
        type: Number,
        required:[true, 'El documento es un campo obligatorio'],
        unique: true
    },
    Correo:{
        type: String,
        required:[true, 'El correo es un campo obligatorio'],
        unique: true
    },
    Contrasena:{
        type: String,
        required:[true, 'La contrasena es un campo obligatorio']
    },
    Agenda:{
        type: String,
    },
    Rol: {
        type: String,
        required: [true, 'El rol es un campo obligatorio'],
        enum: ['Administrador', 'Secretaria', 'Veterinario','Dueno']

    },
    Estado: {
        type: Boolean,
        default:true
    }
})

module.exports = model('Usuario', usuarioSchema)