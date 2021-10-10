const express = require('express')
const router = express.Router()
const login = require('../middleware/login')

const CadastroController = require('../controllers/registered-controller')

router.get('/', CadastroController.getCadastros)
router.post('/', login.obrigatorio, CadastroController.postCadastro)
router.get('/:id_cadastro', CadastroController.getUmCadastro)
router.patch('/', login.obrigatorio, CadastroController.updateCadastro)
router.delete('/', login.obrigatorio, CadastroController.deleteCadastro)

module.exports = router