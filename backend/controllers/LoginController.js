const database = require('../models')
const jwt = require('jsonwebtoken');

var users = [
    { userName: "Lucas", password: "123" }
];

class LoginController {
    static async login(req, res) {
        let loginData = req.body;
        let userId = users.findIndex(user => user.userName == loginData.userName);
    
        if (userId == -1) {
            return res.status(401).send({
                message: 'Name or password is invalid.'
            });
        }
    
        if (users[userId].password != loginData.password) {
            return res.status(401).send({
                message: 'Name or password is invalid.'
            });
        }
    
        let token = jwt.sign(userId, '123');
    
        res.json(token);
    }

    static async register(req, res) {
        let registerData = req.body;
        let newIndex = users.push(registerData);
        let userId = newIndex - 1;
        let token = jwt.sign(userId, '123');
    
        res.json(token);
    }
}

module.exports = LoginController;