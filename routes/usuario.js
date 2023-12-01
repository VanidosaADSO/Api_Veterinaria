const { Router } = require('express')
const router = Router()//obtener la funcion router
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, postUsuario, putUsuario, patchUsuario, deleteUsuario } = require('../controllers/usuario')

router.get('/', getUsuarios )

router.post('/', [
    check('Nombre', 'El nombre es un campo obligatorio').not().isEmpty(),

    check('Apellido', 'El apellido es un campo obligatorio').not().isEmpty(),

    check('Documento', 'El documento debe tener minimo 8 dijitos').isLength({ min: 8 }),

    check('Correo', 'El correo no es valido').isEmail(),

    check('Contrasena', 'La contraseña debe contener minimo 8 caracteres').isLength({ min: 8 }),

    check('Rol', 'El rol no es valido').isIn(['Administrador', 'Veterinario','Secretaria','Dueno']),

    validarCampos
], postUsuario)

router.put('/', putUsuario)

router.patch('/', patchUsuario)

router.delete('/', deleteUsuario)

module.exports = router