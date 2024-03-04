const bllAuth = require("../../bll/auth/index");

const index = (req, res) => res.status(200).send({ error: false, message: "Endpoint auth está funcionando!" });

const login = async (req, res) => {

    const { email, password } = req.body;
    const body = { email, password };

    await bllAuth.login(body)
        .then((r) => {
            res.status(200).send(r)
        })
        .catch((e) => res.status(400).send({ error: true, message: e }));

};

const authEndPoint = async (req, res) => {

    const { param } = req.body;

    await bllAuth.authEndPoint(param)
        .then((r) => {
            res.status(200).send(r)
        })
        .catch((e) => {
            res.status(400).send({ error: true, message: e })
        });

};

module.exports = {
    index,
    login,
    authEndPoint
};