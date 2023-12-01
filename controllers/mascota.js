const mascota = require('../models/mascota')

const getMascotas = async (req, res) => {
    const Mascotas = await mascota.find()

    res.json({
        Mascotas
    })
}

const postMascota = async (req, res) => {
    const { Nombre, Tipo, Raza, Edad, Color, Dueno } = req.body

    const mascota1 = new mascota({ Nombre, Tipo, Raza, Edad, Color, Dueno });
    mascota1.save();

    res.json({
        mascota1
    })

}

const putMascota = async (req, res) => {
    const { Nombre, Tipo, Raza, Edad, Color, Dueno } = req.body

    const mascota1 = mascota.findOneAndUpdate({ _id: _id },
        { Nombre: Nombre, Tipo: Tipo, Raza: Raza, Edad: Edad, Color: Color, Dueno: Dueno })

    res.json({
        mascota1
    })
}

const deleteMascota = async (req, res) => {
    const { _id } = req.query
    const mascota1 = await mascota.findOneAndDelete({ _id: _id })

    res.json({
        mascota1
    })
}


module.exports = {
    getMascotas,
    postMascota,
    putMascota,
    deleteMascota
}