const Resenas = require('../models/resena')
const path = require('path');
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const fileUpload = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({
                "error": 500
            })
        }
    })
}

const getResenas = async (req, res) => {
    const Resena = await Resenas.find()

    res.json({
        Resena
    })
}

const obtenerImagen = (req, res) => {
    const id = req.params.id;
    Resenas.findById(id)
        .then((result) => {
            if (result.imagen) {

                const pathImagen = path.join(__dirname, '../uploads', result.imagen)

                if (fs.existsSync(pathImagen)) {
                    return res.sendFile(pathImagen)
                }
            }

            const pathImagen = path.join(__dirname, '../uploads/no_image_available.png')
            res.sendFile(pathImagen)
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los datos del producto' });
        });
};

const postResena = async (req, res) => {

    if (!req.files || !req.files.imagen) {
        return res.status(400).json({ msg: 'No se proporcionó una imagen válida.' });
    }

    const { imagen } = req.files;
    const nombreCortado = imagen.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    const extensionesValidas = ['png', 'jpg', 'jpeg'];
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({ msg: `La extensión ${extension} no es permitida, extensiones válidas ${extensionesValidas}` });
    }

    const nombreFinal = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads', nombreFinal);

    // Utiliza promisify para convertir imagen.mv en una función basada en promesas
    const mvPromise = util.promisify(imagen.mv);

    await mvPromise(uploadPath); // Espera a que se complete la operación de mover la imagen

    const { Nombre, Correo, Resena, Estado } = req.body

    const Resena1 = new Resenas({ Nombre, Correo, Resena, Estado, imagen: nombreFinal, });
    await Resena1.save();

    res.json({
        Resena1
    })
}

const putResena = async (req, res) => {
    const { _id, Nombre, Correo, Resena } = req.body

    const Resena1 = await Resenas.findOne({ _id: _id })
    // Editar imagen 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
        res.status(400).json({ msg: 'No hay archivos que subir' });
        return;
    }

    try {
        if (Resena1.imagen) {
            const pathImagenBorrar = path.join(__dirname, '../uploads', Resena1.imagen);
            if (fs.existsSync(pathImagenBorrar)) {
                fs.unlinkSync(pathImagenBorrar)
            }
        }
    } catch (error) {
        console.log(error)
    }
    const { imagen } = req.files;
    const nombreCortado = imagen.name.split('.')
    const extension = nombreCortado[nombreCortado.length - 1]

    const extensionesValidas = ['png', 'jpg', 'jpeg'];
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({ msg: `La extensión ${extension} no es permitida, extensiones válidas ${extensionesValidas}` })
    }

    const nombreFinal = uuidv4() + '.' + extension
    const uploadPath = path.join(__dirname, '../uploads', nombreFinal);


    imagen.mv(uploadPath, (err) => {
        if (err) {
            console.log(err)
        }
    });
    const ResenaActualizada = await Resenas.findOneAndUpdate({ _id: _id }, { Nombre: Nombre, Correo: Correo, Resena: Resena, imagen: nombreFinal })

    res.json({
        ResenaActualizada
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
    obtenerImagen,
    postResena,
    putResena,
    patchResena,
    deleteResena,
    fileUpload
}