const { Schema, model } = require('mongoose')

const ServicioShema = Schema({
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
        type: [ServicioShema],
        required: [true, 'Se tiene que agregar un servicio como minimo']
    },
    Fecha_Hora: {
        type: Date,
        required: [true, 'La fechaCita es un campo obligatorio']
    },
    Diponibilidad: {
        type: String,
        required: [true, 'La descripcion es un campo obligatorio']
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

module.exports = model('Citas', CitaSchema)
