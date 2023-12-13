const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { getResenas, obtenerImagen, postResena, putResena, patchResena, deleteResena } = require('../controllers/resena')

router.get('/', getResenas)

router.get('/obtenerImagen/:id', obtenerImagen);

router.post('/', [
    check('Nombre', 'El nombre es un campo obligatorio').not().isEmpty(),

    check('Correo', 'El correo no es valido').isEmail(),

    check('Resena', 'La reseña es un campo obligatorio'),

    validarCampos

], postResena)

router.put('/', putResena)

router.patch('/', patchResena)

router.delete('/', deleteResena)

module.exports = router