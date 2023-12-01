const usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')

const getUsuarios = async (req, res) => {
    const Usuarios = await usuario.find()

    res.json({
        Usuarios
    })
}

const postUsuario = async (req, res) => {
    const { Nombre, Apellido, Documento, Correo, Contrasena, Rol } = req.body

    const usuario1 = new usuario({ Nombre, Apellido, Documento, Correo, Contrasena, Rol });
    usuario1.Contrasena = bcrypt.hashSync(Contrasena, 10)
    usuario1.save();

    res.json({
        usuario1
    })
}

const putUsuario = async (req, res) => {
    const { _id, Nombre, Apellido, Documento, Correo, Contrasena, Rol } = req.body

    const usuario1 = await usuario.findOneAndUpdate({ _id: _id },
        {
            Nombre: Nombre, Apellido: Apellido, Documento: Documento, Correo: Correo,
            Contrasena: Contrasena, Rol: Rol
        })
    res.json({
        usuario1
    })
}

const patchUsuario = async (req, res) => {
    const { _id, Contrasena } = req.body;

    const hashedPassword = await bcrypt.hash(Contrasena, 10);
    await usuario.findOneAndUpdate(
        { _id: _id },
        { Contrasena: hashedPassword }
    );

    res.json({
        message: 'Actualización realizada'
    });
};

const deleteUsuario = async (req, res) => {
    const { _id } = req.query

    const usuario1 = await usuario.findOneAndDelete({ _id: _id })

    res.json({
        msg: 'Usuario Eliminado',
        usuario1
    })
}




module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    patchUsuario,
    deleteUsuario
} 
