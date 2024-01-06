// src/auth/validateJWT.js
const jwt = require('jsonwebtoken');

const { getUserById } = require('../services/user.service');
const secret = process.env.JWT_SECRET || 'secret';
function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
  const bearerToken = req.header('Authorization');
  console.log(bearerToken);

  if (!bearerToken) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  const token = extractToken(bearerToken);
  try {
    const decoded = jwt.verify(token, secret);  
    const user = await getUserById(decoded.data.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};