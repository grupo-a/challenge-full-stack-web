import express from 'express'
import { Routes } from './http/Routes'
import { tokens } from '../di/Tokens'
import { container } from '../di/Container'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../docs/swagger.json'

const app = express()

app.use(express.json())

const routes = container.resolve<Routes>(tokens.Routes)
routes.setupRouter(app)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

export default app
