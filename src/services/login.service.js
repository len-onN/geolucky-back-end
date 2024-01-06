const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secret = process.env.JWT_SECRET || 'secret';

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const LoginService = async ({ email, password }) => {
    const user = await User.findOne({ where: { email }  });
    const userId = user.id;
    if (user && user.password === password) {
        const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);
        return { token, userId };
    } else {
        return { message: "dado de login inconsistente"};
    }
}

const GetUserById = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) {
        return { message: "usuario não encontrado" };
    }
    return user;
}

module.exports = {
    LoginService,
    GetUserById
};