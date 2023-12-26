const { Schema, model } = require('mongoose')

const ServicioSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre del servicio es obligatorio']
    }
})
const CitaSchema = Schema({
    Documento:{
        type:Number,
        required: [true, 'El documento del dueño de la mascota es obligatorio']
    },
    Servicios: {
        type:[ServicioSchema],
        required: [true, 'Se tiene que agregar un servicio como minimo']
    },
    Mascota:{
        type:String,
        required: [true, 'El nombre de la mascota es obligatorio']
    },
    Veterinario:{
        type:String,
        required: [true, 'El veterinario es obligatorio ']
    },
    Fecha_Hora: {
        type: Date,
        required: [true, 'La fechaCita es un campo obligatorio']
    },
    Disponibilidad: {
        type: String,
        required: [true, 'La disponibilidad es un campo obligatorio']
    },
    Cupon: {
        type: String,
        required: [true, 'El cupon es un campo obligatorio']
    },
    Estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Cita', CitaSchema)
