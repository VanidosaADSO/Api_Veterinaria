const categoria = require('../models/categoria')

const getCategorias = async (req, res) => {
    const Categorias = await categoria.find()

    res.json({
        Categorias
    })
}

const postCategoria = async (req, res) => {
    const { Nombre, Estado } = req.body

    const categoria1 = new categoria({ Nombre, Estado })
    await categoria1.save()

    res.json({
        categoria1
    })
}

const putCategoria = async (req, res) => {
    const { _id, Nombre, Estado } = req.body

    const categoria1 = await categoria.findOneAndUpdate({ _id: _id }, { Nombre: Nombre, Estado: Estado })

    res.json({
        categoria1
    })
}

const patchCategoria = async (req, res) => {
    const { _id, Estado } = req.body

    const categoria1 = await categoria.findOneAndUpdate({ _id: _id }, { Estado: Estado })

    res.json({
        categoria1
    })
}

const deleteCategoria = async (req, res) => {
    const { _id } = req.query

    const categoria1 = await categoria.findOneAndDelete({ _id: _id })

    res.json({
        categoria1
    })
}

module.exports = {
    getCategorias,
    postCategoria,
    putCategoria,
    patchCategoria,
    deleteCategoria
}