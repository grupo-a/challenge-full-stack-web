export default (express, cors, routerInstance) => {
  const app = express()

  app.use(cors())

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(routerInstance)

  app.use(express.static('public'))

  return app
}
