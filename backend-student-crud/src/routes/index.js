const router = require('express').Router();

const students = require('./students');

router.use('/students', students);
router.get('/', (req, res) => res.redirect('/docs'));

module.exports = router;
