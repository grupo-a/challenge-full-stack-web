const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      code: 401,
      cause: 'authMiddleware',
      message: 'Token não fornecido',
    });
  }

  const [, token] = authHeader.split(' '); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      cause: 'authMiddleware',
      message: 'Token inválido ou expirado',
    });
  }
}

module.exports = authMiddleware;
