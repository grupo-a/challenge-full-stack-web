import Joi from 'joi'

export const addStudentSchema = Joi.object({
  body: Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().required(),
    ra: Joi.number().required(),
    cpf: Joi.string().required(),
    isActive: Joi.boolean(),
  }),
})

export const updateStudentSchema = Joi.object({
  body: Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().required(),
    ra: Joi.number().required(),
    cpf: Joi.string().required(),
    isActive: Joi.boolean(),
  }),
})

export const deleteStudentSchema = Joi.object({
  body: Joi.object({
    ra: Joi.number().required(),
  }),
})
