const { response, request } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { Documento, Contrasena } = req.body;
    try {
        const usuarioEncontrado = await usuario.findOne({ Documento });

        if (!usuarioEncontrado) {
            return res.status(400).json({
                msg: 'Usuario / Documento no encontrado'
            });
        }

        const contrasenaCorrecta = await bcrypt.compare(Contrasena, usuarioEncontrado.Contrasena);
        if (!contrasenaCorrecta) {
            return res.status(400).json({
                msg: 'Usuario / contraseña incorrecta'
            });
        }

        const token = await generarJWT(usuarioEncontrado._id);
        res.json({
            usuario: usuarioEncontrado,
            token
        });
        console.log('SESIÓN INICIADA');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

module.exports = {
    login
};
