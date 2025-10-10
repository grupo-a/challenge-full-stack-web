const Joi = require('joi');

class StudentValidator {
    constructor() {
        this.createSchema = Joi.object({
            name: Joi.string()
                .min(2)
                .max(255)
                .required()
                .messages({
                    'string.empty': 'Name is required',
                    'string.min': 'Name must be at least 2 characters long',
                    'string.max': 'Name must be less than 255 characters long',
                    'any.required': 'Name is required'
                }),
            email: Joi.string()
                .email()
                .required()
                .messages({
                    'string.email': 'Please provide a valid email',
                    'string.empty': 'Email is required',
                    'any.required': 'Email is required'
                }),
            ra: Joi.string()
                .required()
                .messages({
                    'string.empty': 'RA is required',
                    'any.required': 'RA is required'
                }),
            cpf: Joi.string()
            // .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
            .required()
            .messages({
                // 'string.pattern.base': 'CPF must be in format XXX.XXX.XXX-XX',
                'string.empty': 'CPF is required',
                'any.required': 'CPF is required'
             })
        });

        this.updateSchema = Joi.object({
            name: Joi.string()
                .min(2)
                .max(255)
                .messages({
                    'string.min': 'Name must be at least 2 characters long',
                    'string.max': 'Name must be less than 255 characters long'
                }),
            email: Joi.string()
                .email()
                .messages({
                    'string.email': 'Please provide a valid email'
                })
        }).min(1); 
    }

    validateCreate(data) {
        return this.createSchema.validate(data, { abortEarly: false });
    }

    validateUpdate(data) {
        return this.updateSchema.validate(data, { abortEarly: false });
    }
}

module.exports = new StudentValidator();