import { strToBool } from '../../../src/utils/convertions'

describe('strToBool', () => {
  it('should return true when str is true', () => {
    expect(strToBool('true')).toEqual(true)
  })
  it('should return false when str is false', () => {
    expect(strToBool('false')).toEqual(false)
  })
})
