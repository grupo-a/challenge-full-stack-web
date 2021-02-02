const express = require('express')
const router = express.Router()

//Call validation middleware
const { validateAuth } = require('../app/middlewares/validate')

//Get controller instance
const UserController = require('../app/controllers/UserController')

//Auth
router.post('/auth', validateAuth, UserController.auth)

module.exports = router