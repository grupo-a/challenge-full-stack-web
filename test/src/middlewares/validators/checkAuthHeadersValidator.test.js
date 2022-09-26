import checkAuthHeadersValidator from '../../../../src/middlewares/validators/checkAuthHeadersValidator'
import zod from 'zod'
import {
  checkAuthHeadersValidatorDataOk,
  checkAuthHeadersValidatorDataFail
} from '../../../mocks/index.mock.js'

describe('checkAuthHeadersValidator', () => {
  const validator = checkAuthHeadersValidator(zod)
  it('should validate headers auth', () => {
    const result = validator.parse(checkAuthHeadersValidatorDataOk)
    expect(result).toEqual(checkAuthHeadersValidatorDataOk)
  })
  it('should throw an error if wrong headers provided', () => {
    expect(() => validator.parse(checkAuthHeadersValidatorDataFail)).toThrow()
  })
})
