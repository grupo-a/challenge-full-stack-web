import zod from 'zod'
import studentPatchValidator from '../../../../../src/controllers/students/validators/studentPatchValidator'
import {
  studentPatchValidatorDataOk,
  studentPatchValidatorDataFail
} from '../../../../mocks/index.mock.js'

describe('studentPatchValidator', () => {
  const validator = studentPatchValidator(zod)
  it('should validate a student patch request', () => {
    const result = validator.parse(studentPatchValidatorDataOk)
    expect(result).toEqual(studentPatchValidatorDataOk)
  })
  it('should throw an error if wrong id or data provided', () => {
    expect(() => validator.parse(studentPatchValidatorDataFail)).toThrow()
  })
})
