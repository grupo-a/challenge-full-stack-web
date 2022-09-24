export default (swagger) => (req, res) => {
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

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(doc))
}
