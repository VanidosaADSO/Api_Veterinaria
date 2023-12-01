const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { getMascotas, postMascota, putMascota, deleteMascota } = require('../controllers/mascota')

router.get('/', getMascotas)

router.post('/', [
    check('Nombre', 'El nombre es un campo obligatorio').not().isEmpty(),

    check('Tipo', 'El nombre es un campo obligatorio').not().isEmpty(),

    check('Raza', 'El nombre es un campo obligatorio').not().isEmpty(),

    check('Edad', 'El nombre es un campo obligatorio').not().isEmpty(),

    check('Color', 'El nombre es un campo obligatorio').not().isEmpty(),

    check('Dueno', 'El nombre es un campo obligatorio').not().isEmpty(),

    validarCampos

], postMascota)

router.put('/', putMascota)

router.delete('/', deleteMascota)

module.exports = router