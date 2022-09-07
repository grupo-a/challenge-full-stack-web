import express from 'express'
import { Routes } from './http/Routes'
import { tokens } from '../di/Tokens'
import { container } from '../di/Container'

const app = express()

app.use(express.json())

const routes = container.resolve<Routes>(tokens.Routes)
routes.setupRouter(app)

export default app
