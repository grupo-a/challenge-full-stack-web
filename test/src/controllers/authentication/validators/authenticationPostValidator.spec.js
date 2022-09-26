import authenticationPostValidator from '../../../../../src/controllers/authentication/validators/authenticationPostValidator'
import zod from 'zod'
import {
  authenticationPostDataOk,
  authenticationPostDataFail
} from '../../../../mocks/index.mock.js'

describe('authenticationPostValidator', () => {
  const validator = authenticationPostValidator(zod)
  it('should validate a authentication post request', () => {
    const result = validator.parse(authenticationPostDataOk)
    expect(result).toEqual(authenticationPostDataOk)
  })
  it('should throw an error if wrong id or data provided', () => {
    expect(() => validator.parse(authenticationPostDataFail)).toThrow()
  })
})
