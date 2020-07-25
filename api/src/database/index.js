const { Sequelize } = require('sequelize')
const Student = require('../models/Student')
const databaseConfig = require('../config/database')

const models = [Student]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models.map(model => model.init(this.connection))
  }
}

module.exports = new Database()