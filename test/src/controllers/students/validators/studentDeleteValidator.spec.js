import studentDeleteValidator from '../../../../../src/controllers/students/validators/studentDeleteValidator'
import zod from 'zod'
import {
  studentDeleteValidatorDataOk,
  studentDeleteValidatorDataFail
} from '../../../../mocks/index.mock.js'

describe('studentDeleteValidator', () => {
  const validator = studentDeleteValidator(zod)
  it('should validate a student delete request', () => {
    const result = validator.parse(studentDeleteValidatorDataOk)
    expect(result).toEqual(studentDeleteValidatorDataOk)
  })
  it('should throw an error if wrong id provided', () => {
    expect(() => validator.parse(studentDeleteValidatorDataFail)).toThrow()
  })
})
