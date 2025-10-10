const express = require('express');
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/login', authController.login);
router.get('/validate', authMiddleware, authController.validateToken);

module.exports = router;