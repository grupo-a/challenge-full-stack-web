const jwt = require('jsonwebtoken');

const auth = async (request, response, next) => {
    try {
        const token = request.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return response.status(401).json({ 
                success: false, 
                message: 'Acesso negado. Token não fornecido.' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'development-secret-key');
        request.user = decoded;
        next();
    } catch (error) {
        return response.status(401).json({ 
            success: false, 
            message: 'Token inválido.' 
        });
    }
};

module.exports = auth;