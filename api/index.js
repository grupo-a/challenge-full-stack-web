const express = require('express');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json())

const port = 3000

app.get('/teste', (req, res) => res.status(200).send({ mensagem: 'starting the API' }))

app.listen(port, () => console.log('API running'))

module.exports = app