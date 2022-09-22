import express from 'express'
import cors from 'cors'
//import StudentsService from './services/Students.js'
//import postgresConnection from './config/database/postgres/postgres.js'
import router from './routes/index.js'

const port = process.env.PORT || 3330

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//const studentsService = new StudentsService(postgresConnection)

//await studentsService.createStudent({
//  email: 'teste@gmail.com',
//  ra: '123456',
//  cpf: '12345678910'
//})

app.use(router)

app.listen(port, async () => {
  console.log(`Running on port ${port}`)
})
