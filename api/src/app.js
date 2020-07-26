const express = require('express')
const routes = require('./routes')

require('./database/')

class App {
  constructor() {
    this.server = express()

    this.middleware()
    this.routes()
  }

  middleware() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }
}

module.exports = new App().server
