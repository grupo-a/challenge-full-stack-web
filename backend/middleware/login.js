const jwt = require('jsonwebtoken')

exports.obrigatorio = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode;
        next();
    } catch {
        return res.status(401).send({ message: 'Falha na autenticação'})
    }
}

exports.opcional = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode;
        next();
    } catch {
        next();
    }
}