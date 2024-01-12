const { User } = require('../models');
const TokenService = require('./token.service');
const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const transporter = require('../utils/email');

const getAllUsers = async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
};

const getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        return user;
    }
    catch (err) {
        console.log(err);
        return err;
    }
};

const newUser = async ({fullName, email, password }) => {
    console.log("email: ", email);
    // try {
        const user = await User.findOne({where: {email}});
        console.log("user: ", user);
        if (user) {
            if (user.email === email) {
                return { message: "email já registrado" };
            }
        }
    // }
    // catch (e) {
    //     return { message: e};
    // }
    console.log("aaa ", fullName, email, password)
    const newUser = await User.create({
        fullName, email, password
    });
    console.log("newUser ", newUser);
    await TokenService.newToken(newUser.id);
    return newUser;
};

module.exports = {
    getAllUsers,
    newUser,
    getUserById,
}