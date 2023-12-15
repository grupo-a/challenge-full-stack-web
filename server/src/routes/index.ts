import { Router } from 'express'

import { studentsRoutes } from './students-routes'
import { usersRoutes } from './users-routes'

const router = Router()

router.use('/students', studentsRoutes)
router.use('/users', usersRoutes)

export { router }
