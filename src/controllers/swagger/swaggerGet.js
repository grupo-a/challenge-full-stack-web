import swaggerJSDoc from 'swagger-jsdoc'

export default (req, res) => {
  const doc = swaggerJSDoc({
    apis: ['src/docs/*.yaml'],
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Educacao API',
        version: '1.0.0'
      }
    }
  })

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(doc))
}
