const servicio = require('../models/servicio')
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

const getServicio = async (req, res) => {
    const servicios = await servicio.find()

    res.json({
        servicios
    })
}

const obtenerImagen = (req, res) => {
    const id = req.params.id;
    servicio.findById(id)
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


const postServicio = async (req, res) => {
    try {
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

        // Ahora puedes guardar la información del producto en la base de datos
        const { Nombre, Descripcion } = req.body;
        const servicio1 = new servicio({
            Nombre,
            Descripcion,
            imagen: nombreFinal, // Guarda el nombre del archivo en la base de datos
        });
        await servicio1.save()

        res.status(201).json({ servicio1: servicio1 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error inesperado.' });
    }
};

const putServicio = async (req, res) => {
    const { _id, Nombre, Descripcion } = req.body;

    const servicios = await servicio.findOne({ _id: _id });

    // Editar imagen 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
        res.status(400).json({ msg: 'No hay archivos que subir' });
        return;
    }

    try {
        if (servicios.imagen) {
            const pathImagenBorrar = path.join(__dirname, '../uploads', servicios.imagen);
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

    const updatedProducto = await servicio.findByIdAndUpdate(
        { _id: _id },
        { Nombre, Descripcion, imagen: nombreFinal }
    );
    res.json({
        msg: "Servicio actualizado exitosamente",
        cita: updatedProducto
    });
};

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
    deleteServicio,
    obtenerImagen,
    fileUpload
}