const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secret';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        // Adiciona o userId ao objeto de requisição para uso posterior
        req.userId = user.data.userId;
        next();
    });
};

module.exports = authenticateToken;
