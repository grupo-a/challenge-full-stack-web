import studentPostValidator from '../../../../../src/controllers/students/validators/studentPostValidator'
import zod from 'zod'
import {
  studentPostValidatorDataOk,
  studentPostValidatorDataFail
} from '../../../../mocks/index.mock.js'
import { jest } from '@jest/globals'

describe('studentPatchValidator', () => {
  it('should validate a student post request', () => {
    const isValidCPF = jest.fn().mockImplementation((value) => value)
    const validator = studentPostValidator(zod, isValidCPF)
    const result = validator.parse(studentPostValidatorDataOk)
    expect(result).toEqual(studentPostValidatorDataOk)
  })
  it('should throw an error if wrong id or data provided', () => {
    const isValidCPF = jest.fn().mockImplementation(() => false)
    const validator = studentPostValidator(zod, isValidCPF)
    expect(() => validator.parse(studentPostValidatorDataFail)).toThrow()
  })
})
