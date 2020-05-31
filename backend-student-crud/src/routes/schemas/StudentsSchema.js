const Joi = require('@hapi/joi');

const RouteValidator = require('./RouteValidator');

class StudentsSchema extends RouteValidator {
  static get create() {
    const schema = {
      body: Joi.object().keys({
        name: Joi.string().trim().empty(),
        email: Joi.string().email().required(),
        cpf: Joi.string().min(11).max(11)
      }),
    };

    return this.validate(schema);
  }
}

module.exports = StudentsSchema;
