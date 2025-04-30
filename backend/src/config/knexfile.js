const path = require("path")
const dotenv = require("dotenv")

dotenv.config({ path: path.resolve(__dirname, "../../.env") })

module.exports = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  migrations: {
    tableName: "knex",
    directory: path.resolve(__dirname, "../database/migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "../database/seeds"),
  },
}
