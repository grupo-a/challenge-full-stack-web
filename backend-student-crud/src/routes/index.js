const router = require('express').Router();

const students = require('./students');

router.use('/students', students);

module.exports = router;
