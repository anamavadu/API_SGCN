const jwt = require('jsonwebtoken'); // Importa el paquete 'jsonwebtoken' para trabajar con tokens JWT

// Middleware de autenticación que verifica si el usuario tiene un token válido
const authMiddleware = (req, res, next) => {
const token = req.header('Authorization').replace('Bearer ', '');
if (!token) {
    return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
}
try {
    const verified = jwt.verify(token, 'your_jwt_secret');
    req.user = verified;
    next();
} catch (error) {
    res.status(400).json({ error: 'Token no válido' });
}
};

module.exports = authMiddleware;