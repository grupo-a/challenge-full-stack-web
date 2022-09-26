import hashBcrypt from '../../../src/utils/hashBcrypt'
import bcrypt from 'bcrypt'
import { CustomError } from '../../../src/utils/errorHandler.js'

describe('hashBcrypt', () => {
  const hash = hashBcrypt(bcrypt, CustomError)
  it('should return a hash', async () => {
    const hashedValue = await hash.hashValue('password')
    expect(hashedValue).toBeDefined()
  })

  it('should return true if the value is equal to the hash', async () => {
    const hashedValue = await hash.hashValue('password')
    const result = await hash.compareHash('password', hashedValue)
    expect(result).toBeTruthy()
  })
  it('should return false if the value is not equal to the hash', async () => {
    const hashedValue = await hash.hashValue('password')
    await expect(
      async () => await hash.compareHash('wrongPassword', hashedValue)
    ).rejects.toThrowError(CustomError)
  })
})
