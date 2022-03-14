const express = require('express');
const routes = require('./routes')
const cors = require('cors');

const app = express()
const port = 3000

app.use(cors());
app.use((req, res, next) => {
    res.set('X-Powered-By', 'Bruno Barbosa');
    res.set('Access-Control-Allow-Origin', '*');
    next();
})
routes(app)

app.listen(port, () => console.log('API running'))

module.exports = app