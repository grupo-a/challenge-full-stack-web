const express = require('express')
const router = express.Router()

const UsuariosController = require('../controllers/users-controller')

router.post('/registration', UsuariosController.cadastraUsuario)
router.post('/login', UsuariosController.Login)

module.exports = router;