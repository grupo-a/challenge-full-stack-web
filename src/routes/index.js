export default (dependencies) => {
  const {
    express,
    studentPostController,
    studentPatchController,
    studentGetListController,
    studentDeleteController,
    authenticationPostController,
    swaggerGetController,
    checkAuthMiddleware: checkAuth
  } = dependencies
  const router = express.Router()

  router.post('/v1/authentication', authenticationPostController)
  router.post('/v1/students', checkAuth('manager'), studentPostController)
  router.patch('/v1/students/:id', checkAuth('manager'), studentPatchController)
  router.delete('/v1/students/:id', checkAuth('manager'), studentDeleteController)
  router.get('/v1/students', checkAuth('manager'), studentGetListController)
  router.get('/v1/swagger.json', swaggerGetController)

  return router
}
