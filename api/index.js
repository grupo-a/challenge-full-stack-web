const app = require('./server')

app.listen(process.env.API_PORT, () => console.log('API running'))
