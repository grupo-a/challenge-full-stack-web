// development|production
let node_env = process.env.NODE_ENV || 'development'

if (node_env == 'development') {
  require('dotenv').config({
    path: '.env',
  })
}

module.exports = {
  logLevel: process.env.LOG_LEVEL,
  dataBase: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME
  },
  cronTime: {
    processQueue: '*/1 * * * *',
  },
  timezone: 'Europe/London'
}
