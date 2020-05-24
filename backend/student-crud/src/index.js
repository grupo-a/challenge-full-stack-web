const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('Servidor rodando!')
})