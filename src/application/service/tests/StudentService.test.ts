import { studentMock } from '../../../domain/infraestructure/mocks/studentMock'
import { StudentRepositoryMock } from '../../../domain/infraestructure/mocks/StudentRepositoryMock'
import { StudentService } from '../StudentService'

const studentRepository = new StudentRepositoryMock()
const studentService = new StudentService(studentRepository)

describe('StudentService', () => {
  describe('add()', () => {
    test('should return 200', async () => {
      const data = await studentService.add(studentMock)

      expect(data).toEqual(studentMock)
    })
  })
  describe('getAll()', () => {
    test('should return 200', async () => {
      const data = await studentService.getAll()

      expect(data).toEqual([studentMock])
    })
  })
  describe('getByName()', () => {
    test('should return 200', async () => {
      const data = await studentService.getByName(studentMock.nome)

      expect(data).toEqual([studentMock])
    })
  })
  describe('getByRa()', () => {
    test('should return 200', async () => {
      const data = await studentService.getByRa(studentMock.ra)

      expect(data).toEqual(studentMock)
    })
  })
  describe('update()', () => {
    test('should return 200', async () => {
      const data = await studentService.update(studentMock)

      expect(data).toEqual(studentMock)
    })
  })
  describe('delete()', () => {
    test('should return 200', async () => {
      const data = await studentService.delete(studentMock.ra)

      expect(data).toEqual(studentMock)
    })
  })
})
