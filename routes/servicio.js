const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { getServicio, obtenerImagen, postServicio, putServicio, deleteServicio } = require('../controllers/servicio')

router.post('/', [
    check('Nombre', 'EL campo nombre es obligatorio').not().isEmpty(),

    check('Descripcion', 'EL campo descripcion es obligatorio').not().isEmpty(),

    validarCampos
], postServicio)

router.get('/', getServicio)

router.get('/obtenerImagen/:id', obtenerImagen);

router.put('/', putServicio)

router.delete('/', deleteServicio)

module.exports = router