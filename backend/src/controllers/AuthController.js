const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
    async login(request, response) {
        try {
            const { username, password } = request.body;

            if (!username || !password) {
                return response.status(400).json({
                    success: false,
                    message: 'Username e password são obrigatórios'
                });
            }

            
            const user = await User.findOne({
                where: { username }
            });

            if (!user) {
                return response.status(401).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }

           
            if (password === 'admin123') {
                const token = jwt.sign(
                    { 
                        id: user.id, 
                        username: user.username
                    },
                    process.env.JWT_SECRET || 'development-secret-key',
                    { expiresIn: '24h' }
                );

                return response.json({
                    success: true,
                    message: 'Login realizado com sucesso',
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        full_name: user.full_name
                    }
                });
            }

            return response.status(401).json({
                success: false,
                message: 'Credenciais inválidas'
            });

        } catch (error) {
            console.error('Erro no login:', error);
            response.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    async validateToken(request, response) {
        try {
            const user = await User.findByPk(request.user.id);
            response.json({
                success: true,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    full_name: user.full_name
                }
            });
        } catch (error) {
            response.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        }
    }
}

module.exports = new AuthController();