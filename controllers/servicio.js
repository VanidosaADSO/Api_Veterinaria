const servicio = require('../models/servicio')

const getServicio = async (req, res) => {
    const servicios = await servicio.find()

    res.json({
        servicios
    })
}

const postServicio = async (req, res) => {
    const {Nombre, Descripcion} = req.body

    const servicio1 = new servicio({Nombre, Descripcion})
    await servicio1.save()

    res.json({
        servicio1
    })
}

const putServicio = async(req,res)=>{
    const {Nombre, Descripcion} = req.body

    const servicio1 = await servicio.findOneAndUpdate({_id:_id},{Nombre:Nombre, Descripcion:Descripcion})

    res.json({
        servicio1
    })
}

const deleteServicio = async (req, res) => {
    const { _id } = req.query

    const servicio1 = await servicio.findOneAndDelete({ _id: _id })

    res.json({
        servicio1
    })
}

module.exports = {
    getServicio,
    postServicio,
    putServicio,
    deleteServicio
}