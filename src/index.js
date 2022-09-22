import express from 'express'
import cors from 'cors'

import router from './routes/index.js'

const port = process.env.PORT || 3330

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

app.use(express.static('public'))

app.listen(port, async () => {
  console.log(`Running on port ${port}`)
})
