const express = require('express')
const app = express()
const dbSync = require('./app/config/database/sync')

//Sync DB within app
dbSync.async()

//Define routes
const usersRoute = require('./routes/users')
const studentsRoute = require('./routes/students')

app.use('/users', usersRoute)
app.use('/students', studentsRoute)

//Initialize app
app.listen(3000)

module.exports = app