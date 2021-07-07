const { celebrate } = require('celebrate')
const { Router } = require('express')
const TemplateController = require('../controllers/TemplateController')
const templateValidationSchema = require('./validations/TemplateValidations');

const templateRouter = Router();
const templateController = new TemplateController();

templateRouter.post(
    '/',
    celebrate({
        body: templateValidationSchema.store
    }),
    templateController.store,
);

module.exports = templateRouter