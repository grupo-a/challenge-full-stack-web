const modelUser = require("../../models/user");

const include = (body) => {

    return new Promise(async (resolve, reject) => {

        await modelUser.include(body)
            .then((r) => { resolve(r) })
            .catch((e) => { reject(e); });

    });

};

const list = () => {

    return new Promise(async (resolve, reject) => {

        await modelUser.list()
            .then((r) => { resolve(r) })
            .catch((e) => { reject(e); });

    });

};

const deleteUser = (idUser) => {
    return new Promise(async (resolve, reject) => {

        await modelUser.deleteUser(idUser)
            .then((r) => { resolve(r) })
            .catch((e) => { reject(e); });

    });
};

const alterUser = (idUser, body) => {
    return new Promise(async (resolve, reject) => {

        await modelUser.alterUser(idUser, body)
            .then((r) => { resolve(r) })
            .catch((e) => { reject(e); });

    });
};

const educationalInstitutionList = () => {

    return new Promise(async (resolve, reject) => {

        await modelUser.educationalInstitutionList()
            .then((r) => { resolve(r) })
            .catch((e) => { reject(e); });

    });

};
const typeUserList = () => {

    return new Promise(async (resolve, reject) => {

        await modelUser.typeUserList()
            .then((r) => { resolve(r) })
            .catch((e) => { reject(e); });

    });

};

module.exports = {
    include,
    list,
    deleteUser,
    alterUser,
    educationalInstitutionList,
    typeUserList
};