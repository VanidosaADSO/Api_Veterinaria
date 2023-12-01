const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { getServicio, postServicio, putServicio, deleteServicio } = require('../controllers/servicio')

router.get('/', getServicio)

router.post('/', [
    check('Nombre', 'EL campo nombre es obligatorio').not().isEmpty(),

    check('Descripcion', 'EL campo descripcion es obligatorio').not().isEmpty(),

    validarCampos
], postServicio)

router.put('/',putServicio)

router.delete('/',deleteServicio)

module.exports = router