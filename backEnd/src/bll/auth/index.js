const modalAuth = require("../../models/auth");

const login = (body) => {

    return new Promise(async (resolve, reject) => {
    
        await modalAuth.login(body)
            .then((r) => { resolve(r) })
            .catch((e) => { reject(e); });

    });

};

const authEndPoint = (body) => {

    return new Promise(async (resolve, reject) => {
    
        await modalAuth.authEndPoint(body)
            .then((r) => { resolve(r) })
            .catch((e) => { reject(e); });

    });

};

module.exports = {
    login,
    authEndPoint
};