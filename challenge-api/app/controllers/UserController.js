const Student = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Generate Token
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, 'interstellar', { expiresIn: '1d' })
}

//Auth User
exports.auth = async (req, res) => {
    const { username, password } = req.body

    const student = await Student.findOne({ where: { username: username } })

    if (!student) res.json({ 'error': 'Nome de usuário inválido' })

    bcrypt.compare(password, student.password, (err, same) => {
        if (!same) {
            res.json({ 'error': 'Senha incorreta, tente novamente.' })
        } else {
            res.json({ 
                'success': {
                    'user': {
                        'name': student.name,
                        'username': student.username
                    },
                    'token': createUserToken(student.id) 
                } 
            })
        }
    })
};