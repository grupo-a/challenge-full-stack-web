const express = require('express');
const cors = require('cors');
const route = require('./router');
const error = require('./middleware/middlewareError');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use('/', route);
app.use(error);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

module.exports = app;
