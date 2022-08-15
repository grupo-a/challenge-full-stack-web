const express = require('express')
const routes = express.Router()

const AuthController = require('../controllers/auth-controller')
const authController = new AuthController()

const EnrollController = require('../controllers/enroll-controller')
const enrollController = new EnrollController()

routes.get('/teste', /*authController.validateToken,*/ enrollController.Teste);

module.exports = routes