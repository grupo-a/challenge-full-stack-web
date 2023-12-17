import { Router } from 'express'

import { confirmAuthenticity } from '../middlewares/confirm-authenticity'
import { verifyUserPermission } from '../middlewares/permissions'
import { validateRoutes } from '../middlewares/validate-routes'
import { createStudentController } from '../modules/students/use-cases/create-student'
import { deleteStudentController } from '../modules/students/use-cases/delete-student'
import { getStudentController } from '../modules/students/use-cases/get-student'
import { listStudentsController } from '../modules/students/use-cases/list-students'
import { updateStudentController } from '../modules/students/use-cases/update-student'

import {
    createStudentSchema,
    deleteStudentSchema,
    getStudentSchema,
    listStudentsSchema,
    updateStudentSchema,
} from './schemas/students-schemas'

const studentsRoutes = Router()

studentsRoutes.post(
    '/',
    confirmAuthenticity,
    verifyUserPermission,
    validateRoutes(createStudentSchema),
    async (req, res) => {
        return createStudentController.handle(req, res)
    }
)

studentsRoutes.get(
    '/:id',
    confirmAuthenticity,
    verifyUserPermission,
    validateRoutes(getStudentSchema),
    async (req, res) => {
        return getStudentController.handle(req, res)
    }
)

studentsRoutes.get(
    '/',
    confirmAuthenticity,
    verifyUserPermission,
    validateRoutes(listStudentsSchema),
    async (req, res) => {
        return listStudentsController.handle(req, res)
    }
)

studentsRoutes.put(
    '/:id',
    confirmAuthenticity,
    verifyUserPermission,
    validateRoutes(updateStudentSchema),
    async (req, res) => {
        return updateStudentController.handle(req, res)
    }
)

studentsRoutes.delete(
    '/:id',
    confirmAuthenticity,
    verifyUserPermission,
    validateRoutes(deleteStudentSchema),
    async (req, res) => {
        return deleteStudentController.handle(req, res)
    }
)

export { studentsRoutes }
