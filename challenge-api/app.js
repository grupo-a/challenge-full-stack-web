const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
//const dbSync = require('./app/config/database/sync')

//Implement bodyParser for better requests treatment
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Implement CORS
app.use(cors())

//Sync DB within app
//dbSync.async()

//Define routes
const usersRoute = require('./routes/users')
const studentsRoute = require('./routes/students')

app.use('/users', usersRoute)
app.use('/students', studentsRoute)

//Initialize app
if (require.main === module){
    app.listen(3000)
}

module.exports = app