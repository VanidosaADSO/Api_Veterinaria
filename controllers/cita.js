const cita = require('../models/cita')

const getCitas = async (req, res) => {
    const citas = await cita.find()

    res.json({
        citas
    })
}

const postCita = async (req, res) => {
    const { Documento, Servicios, Mascota, Fecha_Hora, Disponibilidad, Cupon, Estado } = req.body

    const cita1 = new cita({ Documento, Servicios, Mascota, Fecha_Hora, Disponibilidad, Cupon, Estado })

    await cita1.save();

    res.json({
        cita1
    })
}

const putcita = async (req, res) => {

    const { _id, Documento, Servicios, Mascota, Fecha_Hora, Disponibilidad, Cupon, Estado } = req.body;

    if (Servicios && Array.isArray(Servicios)) {
        try {
            const cita1 = await cita.findOne({ _id: _id });

            if (!cita1) {
                return res.status(404).json({ error: 'Cita no encontrada' });
            }

            const updatedServicios = cita1.Servicios.map(existingServicio => {
                const servicioData = Servicios.find(p => p._id && p._id.toString() === existingServicio._id.toString());
                if (servicioData) {
                    if (servicioData.eliminar) {
                        return null;
                    }
                    const updatedServicio = { ...existingServicio.toObject(), ...servicioData };
                    return updatedServicio;
                }
                return existingServicio;
            }).filter(servicio => servicio !== null)

            //Agregar nuevos servicios 
            const nuevosServicios = Servicios.filter(p => !p._id);
            nuevosServicios.forEach(nuevoServicio => {
                updatedServicios.push(nuevoServicio);
            })

            // Realiza la actualización en la base de datos        
            const updatedServicio = await cita.findByIdAndUpdate(
                { _id: _id },
                { Servicios: updatedServicios, Mascota, Documento, Fecha_Hora, Disponibilidad, Cupon, Estado },
                { new: true }
            );

            res.json({
                msg: "Cita actualizada exitosamente",
                cita: updatedServicio
            });
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
            console.log(error)
        }
    } else {
        res.status(400).json({ error: 'La propiedad servicios debe ser un array' });
    }
};

const patchcita = async (req, res) => {
    const { _id, Estado } = req.body;

    const Cita1 = await cita.findByIdAndUpdate({ _id: _id }, { Estado: Estado })

    res.json({
        Cita1
    })


};

const deletecita = async (req, res) => {
    const { _id } = req.query
    const Cita1 = await cita.findOneAndDelete({ _id: _id })
    res.json({
        Cita1
    })
}
module.exports = {
    getCitas,
    postCita,
    putcita,
    patchcita,
    deletecita
}