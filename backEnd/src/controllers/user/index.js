const bllUser = require("../../bll/user/index");

const index = (req, res) => res.status(200).send({ error: false, message: "Endpoint BackEnd Usuário/Aluno está funcionando!" });

const list = async (req, res) => {

  await bllUser.list()
    .then((r) => {
      res.status(200).send(r)
    })
    .catch((e) => res.status(400).send({ error: true, message: e }));

};

const include = async (req, res) => {

  const { body } = req.body;
  await bllUser.include(body)
    .then((r) => {
      res.status(200).send(r)
    })
    .catch((e) => {
      res.status(400).send({ error: true, message: e })
    });

};

const deleteUser = async (req, res) => {

  const { idUser } = req.params;
  await bllUser.deleteUser(idUser)
    .then((r) => {
      res.status(200).send(r)
    })
    .catch((e) => res.status(400).send({ message: e }));

};

const alterUser = async (req, res) => {

  const { idUser } = req.params;
  const { body } = req.body;
  await bllUser.alterUser(idUser, body)
    .then((r) => {
      res.status(200).send(r)
    })
    .catch((e) => res.status(400).send({ message: e }));

};

const typeUserList = async (req, res) => {

  await bllUser.typeUserList()
    .then((r) => {
      res.status(200).send(r)
    })
    .catch((e) => res.status(400).send({ error: true, message: e }));

};

const educationalInstitutionList = async (req, res) => {

  await bllUser.educationalInstitutionList()
    .then((r) => {
      res.status(200).send(r)
    })
    .catch((e) => res.status(400).send({ error: true, message: e }));

};

module.exports = {
  index,
  include,
  list,
  deleteUser,
  alterUser,
  typeUserList,
  educationalInstitutionList
};