const express = require('express');
const app = express()
const routes = require('./routes')
const cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
    res.set('X-Powered-By', 'Bruno Barbosa');
    res.set('Access-Control-Allow-Origin', '*');
    next();
})
routes(app)

module.exports = app;