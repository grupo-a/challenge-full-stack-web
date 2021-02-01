const { body, validationResult } = require('express-validator')

//Use express validator to define validation rules to each student field
exports.validate = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Insira o nome do candidato.')
        .escape(),
    body('email')
        .isEmail()
        .withMessage('Insira um e-mail válido.'),
    body('ra')
        .isLength({ max: 10 })
        .withMessage('Por padrão o RA deve ter no máximo 10 caracteres.'),
    body('cpf')
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