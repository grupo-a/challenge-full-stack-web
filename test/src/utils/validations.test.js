import { isValidCPF } from '../../../src/utils/validations.js'

describe('isValidCPF', () => {
  it('should return true', () => {
    const result = isValidCPF('123.456.789-09')
    expect(result).toEqual(true)
  })
  it('should return false', () => {
    const result = isValidCPF('123.456.789-00')
    expect(result).toEqual(false)
  })
  it('should return false when numbers is repeated', () => {
    const result = isValidCPF('111.111.111-11')
    expect(result).toEqual(false)
  })
  it('should return false when cpf is not a string', () => {
    const result = isValidCPF(12345678909)
    expect(result).toEqual(false)
  })
})
