const Resenas = require('../models/resena')

const getResenas = async (req, res) => {
    const Resena = await Resenas.find()

    res.json({
        Resena
    })
}

const postResena = async (req, res) => {
    const { Nombre, Correo, Resena, Estado } = req.body

    const Resena1 = new Resenas({ Nombre, Correo, Resena, Estado });
    await Resena1.save();

    res.json({
        Resena1
    })
}

const putResena = async (req, res) => {
    const { _id, Nombre, Correo, Resena } = req.body

    const Resena1 = await Resenas.findOneAndUpdate({ _id: _id }, { Nombre: Nombre, Correo: Correo, Resena: Resena })

    res.json({
        Resena1
    })
}

const patchResena = async (req, res) => {
    const { _id, Estado } = req.body;

    const Resena1 = await Resenas.findOneAndUpdate({ _id: _id }, { Estado });

    res.json({
        Resena1
    });
};

const deleteResena = async (req, res) => {
    const { _id } = req.query

    const Resena1 = await Resenas.findOneAndDelete({ _id: _id })

    res.json({
        Resena1
    })
}

module.exports = {
    getResenas,
    postResena,
    putResena,
    patchResena,
    deleteResena
}