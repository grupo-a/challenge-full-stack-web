const express = require('express')
const app = express()

const usersRoute = require('./routes/users')
const studentsRoute = require('./routes/students')

app.use('/users', usersRoute)
app.use('/students', studentsRoute)

app.listen(3000)

module.exports = app