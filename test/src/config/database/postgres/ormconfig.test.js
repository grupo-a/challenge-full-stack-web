import ormconfig from '../../../../../src/config/database/postgres/ormconfig'

describe('ormconfig', () => {
  it('should return an object', () => {
    const strToBool = (str) => {
      return str === 'true'
    }
    const result = ormconfig(strToBool)
    expect(typeof result).toBe('object')
  })
})
