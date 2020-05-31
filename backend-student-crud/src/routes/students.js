const router = require('express').Router();
const StudentsController = require('../app/controllers/StudentsController');
const StudensSchema = require('./schemas/StudentsSchema');

router.get('/', StudentsController.findAll);
router.post('/', StudensSchema.create, StudentsController.create);

module.exports = router;
