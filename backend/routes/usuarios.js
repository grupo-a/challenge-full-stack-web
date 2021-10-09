const express = require('express')
const router = express.Router()

const UsuariosController = require('../controllers/usuarios-controller')

router.post('/registration', UsuariosController.cadastraUsuario)
router.post('/login', UsuariosController.Login)

module.exports = router;