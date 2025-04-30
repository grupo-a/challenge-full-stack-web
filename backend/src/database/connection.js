const knex = require("knex")
const knexConfig = require("../config/knexfile")

const connection = knex(knexConfig)

module.exports = connection
