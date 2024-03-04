module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;


    if (!authHeader) {

        return res.status(401).send({ error: true, message: "Usuário não autorizado" });

    }

    const tkPart = req.headers.authorization.split(" ");

    if (tkPart.length != 2) {

        return res.status(401).send({ error: true, message: "Erro na token" });

    }

    const [scheme, token] = tkPart;

    if (!/^Basic$/i.test(scheme)) {

        return res.status(401).send({ error: true, message: "Autenticação mal formatada" });

    }
    const [email, senha] = new Buffer.from(token, "base64").toString().split(":");

    if (!(email === process.env.BASIC_AUTH_USER && senha === process.env.BASIC_AUTH_PASSWORD)) {

        return res.status(401).send({ error: true, message: "Não autorizado" });

    }

    return next();

};