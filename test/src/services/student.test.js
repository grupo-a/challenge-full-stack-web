import {
  dbConnectionStudentDepOk,
  dbConnectionStudentDepFail,
  studentPostValidatorDataOk,
  listStudentsQuery,
  listStudentsReturn,
  updateStudentData
} from '../../mocks/index.mock.js'
import { CustomError } from '../../../src/utils/errorHandler.js'
import student from '../../../src/services/students'
describe('student', () => {
  it('should successfully execute createStudent', async () => {
    const studentService = student(dbConnectionStudentDepOk, CustomError)
    const studentResult = await studentService.createStudent(studentPostValidatorDataOk)
    expect(studentResult).toEqual(studentPostValidatorDataOk)
  })
  it('should successfully execute listStudents', async () => {
    const studentService = student(dbConnectionStudentDepOk, CustomError)
    const studentResult = await studentService.listStudents(listStudentsQuery)
    expect(studentResult).toEqual(listStudentsReturn)
  })

  it('should successfully execute listStudents when query is empty', async () => {
    const studentService = student(dbConnectionStudentDepOk, CustomError)
    const studentResult = await studentService.listStudents({})
    expect(studentResult).toEqual(listStudentsReturn)
  })
  it('should successfully execute updateStudent', async () => {
    const studentService = student(dbConnectionStudentDepOk, CustomError)
    const studentResult = await studentService.updateStudent(updateStudentData)
    expect(studentResult).toEqual(studentPostValidatorDataOk)
  })
  it('should fail to execute updateStudent', async () => {
    const studentService = student(dbConnectionStudentDepFail, CustomError)
    await expect(studentService.updateStudent(updateStudentData)).rejects.toThrow()
  })
  it('should successfully execute deleteStudent', async () => {
    const studentService = student(dbConnectionStudentDepOk, CustomError)
    const studentResult = await studentService.deleteStudent('b09af8b9-f8ab-4c31-85ac-ff83869c778a')
    expect(studentResult).toEqual(studentPostValidatorDataOk)
  })
  it('should fail to execute deleteStudent', async () => {
    const studentService = student(dbConnectionStudentDepFail, CustomError)
    await expect(
      studentService.deleteStudent('b09af8b9-f8ab-4c31-85ac-ff83869c778a')
    ).rejects.toThrow()
  })
})
