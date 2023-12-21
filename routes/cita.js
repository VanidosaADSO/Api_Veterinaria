const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { getCitas, postCita, putcita, patchcita, deletecita } = require('../controllers/cita');

router.get('/', getCitas)

router.post('/', [

    check('Documento', 'El campo documento es obligatorio.'),
    check('Servicios', 'El campo servicios es obligatorio.'),
    check('Mascota', 'El campo mascota es obligatorio.'),
    check('Fecha_Hora', 'El campo Fecha_Hora es obligatorio.'),
    check('Disponibilidad', 'El campo Diponibilidad es obligatorio.'),
    check('Cupon', 'El campo Cupon es obligatorio.'),
    validarCampos

], postCita)


router.put('/', putcita)

router.patch('/', patchcita)

router.delete('/', deletecita)


module.exports = router