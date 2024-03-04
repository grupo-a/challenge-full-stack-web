const express = require("express");
const routes = express.Router();

const basicAuthMiddleware = require("../middlewares/basicAuthorization");

const userRoute = require("./user");
const authRoute = require("./auth");

routes.use(basicAuthMiddleware);

routes.use(userRoute);
routes.use(authRoute);



module.exports = routes;