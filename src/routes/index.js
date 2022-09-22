import express from 'express'
import authenticationPost from '../controllers/authentication/authenticationPost.js'

const router = express.Router()

router.post('/v1/authentication', authenticationPost)

export default router
