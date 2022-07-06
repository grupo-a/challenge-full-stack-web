const LoginController = require('../controllers/LoginController');

const { Router } = require('express');
const router = Router();

router.post('/login', LoginController.login)
router.post('/register', LoginController.register)

module.exports = router;