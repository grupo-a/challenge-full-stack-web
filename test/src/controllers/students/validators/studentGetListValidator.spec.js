import studentGetListValidator from '../../../../../src/controllers/students/validators/studentGetListValidator'
import zod from 'zod'
import {
  studentGetListValidatorDataOk,
  studentGetListValidatorDataFail
} from '../../../../mocks/index.mock.js'

describe('studentGetListValidator', () => {
  const validator = studentGetListValidator(zod)
  it('should successfully validate', () => {
    const data = validator.parse(studentGetListValidatorDataOk)
    expect(data).toEqual(studentGetListValidatorDataOk)
  })
  it('should throw an error if wrong query provided', () => {
    expect(() => validator.parse(studentGetListValidatorDataFail)).toThrow()
  })
})
