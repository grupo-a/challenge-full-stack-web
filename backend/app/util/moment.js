const moment = require('moment-timezone')
const config = require('../config')

function momentFactory(date) {
  if (!date) {
    return moment.tz(config.timezone)
  } else {
    return moment.tz(date, config.timezone)
  }
}



module.exports = momentFactory
