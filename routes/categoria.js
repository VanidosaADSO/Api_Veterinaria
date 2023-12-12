const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { getCategorias, postCategoria, putCategoria, patchCategoria, deleteCategoria } = require('../controllers/categoria')

router.get('/', getCategorias)

router.post('/', [
    check('Nombre', 'El nombre es un campo obligatorio').not().isEmpty(),

    validarCampos

], postCategoria)

router.put('/', putCategoria)

router.patch('/', patchCategoria)

router.delete('/', deleteCategoria)

module.exports = router