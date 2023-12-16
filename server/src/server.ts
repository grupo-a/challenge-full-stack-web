import 'express-async-errors'
import cors from 'cors'
import express, { json } from 'express'
import { serve, setup } from 'swagger-ui-express'

import { errorHandler } from './middlewares/error-handler'
import { router } from './routes'
import swaggerFile from './swagger.json'

const app = express()

app.use(cors())
app.use(json())
app.use('/docs', serve, setup(swaggerFile))
app.use(router)

app.use(errorHandler)

const PORT = process.env.PORT ?? 3333

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
