const express = require("express")
const cors = require("cors")
const { errors } = require("celebrate")
const bodyParser = require('body-parser');
const { errorMiddleware } = require("./errors/middleware/errorMiddleware");

const app = express();

const config = require("../config")

const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())
app.use(express.json())
app.use(routes)

app.use(errors());
app.use(errorMiddleware)

app.listen(process.env.PORT, function () {
    console.log(`Server running in ${process.env.SERVER}:${process.env.PORT}`);
});

