export default (dep) => (req, res) => {
  const { swagger, responseOk } = dep
  const doc = swagger({
    apis: ['src/docs/*.yaml'],
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Educacao API',
        version: '1.0.0'
      }
    }
  })

  responseOk(res, doc)
}
