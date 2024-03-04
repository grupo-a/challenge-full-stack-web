const express = require("express");
const router = express.Router();

const user = require("../../controllers/user/index");

router.route("/v1/users")
    .post(user.include)
    .get(user.list);

router.route("/v1/users/:idUser")
    .delete(user.deleteUser)
    .put(user.alterUser);

router.route("/v1/typeUser")
    .get(user.typeUserList );

router.route("/v1/educationalInstitution")
    .get(user.educationalInstitutionList);

module.exports = router;