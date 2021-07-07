const Joi = require('joi');

const templateValidationSchema = {

    store: Joi.object().keys({
        nome: Joi.string().required(),
        // email: Joi.string().email().required(),
        // password: Joi.string().required().min(6),
        // password_confirmation: Joi.string().valid(Joi.ref('password')),
    }),

};

module.exports = templateValidationSchema