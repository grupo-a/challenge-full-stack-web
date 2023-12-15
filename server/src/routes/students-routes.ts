import { Router } from 'express'

import { createStudentController } from '../modules/students/use-cases/create-student'
import { deleteStudentController } from '../modules/students/use-cases/delete-student'
import { getStudentController } from '../modules/students/use-cases/get-student'
import { listStudentsController } from '../modules/students/use-cases/list-students'
import { updateStudentController } from '../modules/students/use-cases/update-student'

const studentsRoutes = Router()

studentsRoutes.post('/', async (req, res) => {
    return createStudentController.handle(req, res)
})

studentsRoutes.get('/:id', async (req, res) => {
    return getStudentController.handle(req, res)
})

studentsRoutes.get('/', async (req, res) => {
    return listStudentsController.handle(req, res)
})

studentsRoutes.put('/:id', async (req, res) => {
    return updateStudentController.handle(req, res)
})

studentsRoutes.delete('/:id', async (req, res) => {
    return deleteStudentController.handle(req, res)
})

export { studentsRoutes }