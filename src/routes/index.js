import express from 'express'
import authenticationPost from '../controllers/authentication/authenticationPost.js'
import studentPost from '../controllers/students/studentPost.js'
import studentPatch from '../controllers/students/studentPatch.js'
import studentDelete from '../controllers/students/studentDelete.js'
import studentGetList from '../controllers/students/studentGetList.js'
import checkAuth from '../middlewares/checkAuth.js'
import swaggerGet from '../controllers/swagger/swaggerGet.js'

const router = express.Router()

router.post('/v1/authentication', authenticationPost)

router.post('/v1/students', checkAuth('manager'), studentPost)
router.patch('/v1/students/:id', checkAuth('manager'), studentPatch)
router.delete('/v1/students/:id', checkAuth('manager'), studentDelete)
router.get('/v1/students', checkAuth('manager'), studentGetList)

router.get('/v1/swagger.json', swaggerGet)

export default router
