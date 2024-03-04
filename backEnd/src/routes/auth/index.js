const express = require("express");
const router = express.Router();

const auth = require("../../controllers/auth/index");

router.route("/v1/login")
    .post(auth.login);

router.route("/v1/authEndPoint")
    .post(auth.authEndPoint);

module.exports = router;