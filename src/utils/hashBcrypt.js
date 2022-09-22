import bcrypt from 'bcrypt'

export const hashValue = async (value) => {
  const saltRounds = 13
  const hashValue = await bcrypt.hash(value, saltRounds)
  return hashValue
}

export const compareHash = async (value, hash) => {
  const result = await bcrypt.compare(value, hash)
  return result
}
