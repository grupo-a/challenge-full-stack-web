const express = require('express')
const router = express.Router()

const AlunosController = require('../controllers/alunos-controller')

// retorna todos os alunos
router.get('/', AlunosController.getAlunos)
// insere um aluno
router.post('/', AlunosController.postAlunos)
// pegando o ID do http e armazenando na variável
router.get('/:id_aluno', AlunosController.getUmAluno)
// deleta um aluno
router.delete('/', AlunosController.deleteAluno)

module.exports = router