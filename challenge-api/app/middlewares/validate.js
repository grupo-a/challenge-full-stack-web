const { body, validationResult } = require('express-validator')

//Use express validator to define validation rules to each student field
exports.validateStudentInsert = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Insira o nome do candidato.')
        .escape(),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Insira o email do candidato.')
        .isEmail()
        .withMessage('Insira um e-mail válido.'),
    body('ra')
        .not()
        .isEmpty()
        .withMessage('Insira o RA do candidato.')
        .isLength({ max: 10 })
        .withMessage('Por padrão o RA deve ter no máximo 10 caracteres.'),
    body('cpf')
        .not()
        .isEmpty()
        .withMessage('Insira o CPF do candidato.')
        .isInt()
        .withMessage('O CPF deve possuir somente números.')
        .isLength({ max: 11 })
        .withMessage('O CPF deve ter no máximo 11 caracteres.'),
    (req, res, next) => {
        //Return validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ 'error': errors.array() })
        }
        next()
    }
];

exports.validateStudentUpdate = [
    body('id')
        .not()
        .isEmpty()
        .withMessage('Id não enviado.'),
    body('name')
        .not()
        .isEmpty()
        .withMessage('Insira o nome do candidato.')
        .escape(),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Insira o email do candidato.')
        .isEmail()
        .withMessage('Insira um e-mail válido.'),
    (req, res, next) => {
        //Return validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ 'error': errors.array() })
        }
        next()
    }
];

exports.validateAuth = [
    body('username')
        .not()
        .isEmpty()
        .withMessage('Insira um usuário.')
        .escape(),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Insira a senha.')
        .escape(),
    (req, res, next) => {
        //Return validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ 'error': errors.array() })
        }
        next()
    }
];