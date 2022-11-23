export default (bcrypt, CustomError) => {
  return {
    hashValue: async (value) => {
      const saltRounds = 13
      const hashValue = await bcrypt.hash(value, saltRounds)
      return hashValue
    },

    compareHash: async (value, hash, field = 'password') => {
      const result = await bcrypt.compare(value, hash)
      if (!result) throw new CustomError('Forbidden', field, `Wrong ${field}`)
      return result
    }
  }
}
