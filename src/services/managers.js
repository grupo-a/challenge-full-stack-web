export default (dbConnection, CustomError) => {
  return {
    getManagerByEmail: async (email) => {
      const repository = dbConnection.getRepository('Managers')
      const manager = await repository.findOne({
        where: { email }
      })
      if (!manager) throw new CustomError('NotFound', 'email', 'Manager not found')
      return manager
    }
  }
}
