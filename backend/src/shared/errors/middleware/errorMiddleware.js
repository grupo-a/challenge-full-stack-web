
const errorMiddleware = (err, _request, response, next) => {

    return response.status(500).json({
        status: 'error',
        message:
            process.env.NODE_ENV === 'dev' ? err.message : 'Ocorreu um erro interno.',
    });

};

module.exports = { errorMiddleware };