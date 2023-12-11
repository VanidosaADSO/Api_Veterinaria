const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { getResenas, postResena, putResena, deleteResena } = require('../controllers/resena')

router.get('/', getResenas)

router.post('/', [
    check('Nombre', 'El nombre es un campo obligatorio').not().isEmpty(),

    check('Correo', 'El correo no es valido').isEmail(),

    check('Resena', 'La reseña es un campo obligatorio'),

    validarCampos

], postResena)

router.put('/', putResena)

router.delete('/',deleteResena)

module.exports = router