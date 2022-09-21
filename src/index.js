import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const port = process.env.PORT || 3330

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(port, async () => {
  console.log(`Running on port ${port}`)
})
