const Joi = require('joi');
const { validateCPF } = require('../../../../shared/utils/util');

const studentValidationSchema = {

    store: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        cpf: Joi.custom((value, helper) => {

            if (validateCPF(value) == false)
                return helper.message("CPF is not valid!")

            return value

        })
    }),

    update: Joi.object()
        .keys({
            id_estudante: Joi.number().required(),
        })
        .unknown()
    ,

    delete: Joi.object().keys({
        id_estudante: Joi.number().required(),
    }),

};

module.exports = studentValidationSchema