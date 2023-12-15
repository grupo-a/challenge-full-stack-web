import cors from 'cors'
import express, { json } from 'express'

import { router } from './routes'

const app = express()

app.use(cors())
app.use(json())
app.use(router)

const PORT = process.env.PORT ?? 3333

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
