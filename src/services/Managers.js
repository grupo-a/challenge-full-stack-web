export default class {
  constructor(dbConnection) {
    this.dbConnection = dbConnection
  }
  async getManagerByEmail(email) {
    const repository = this.dbConnection.getRepository('Managers')
    const manager = await repository.findOne({
      where: { email }
    })
    return manager
  }
}
