const { celebrate } = require('celebrate')
const { Router } = require('express')
const StudentController = require('../controllers/StudentController')
const studentValidationSchema = require('./validations/StudentValidations');

const router = Router();
const studentController = new StudentController();

router.get(
    '/',
    studentController.index,
);

router.get(
    '/:id_estudante',
    studentController.show,
);

router.post(
    '/',
    celebrate({
        body: studentValidationSchema.store
    }),
    studentController.store,
);

router.put(
    '/:id_estudante',
    studentController.update,
);

router.delete(
    '/:id_estudante',
    studentController.destroy,
);

module.exports = router