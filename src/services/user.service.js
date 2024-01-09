const { User } = require('../models');
const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const transporter = require('../utils/email');

const getAll = async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
};

const getUserById = async (userId) => {
    console.log("tipo", typeof userId, userId)
    try {
        const user = await User.findByPk(userId);
        // let newToken = "";
        if (user && !user.isConfirmed) {
            try {
                const tokenValid = jwt.verify(user.token, secret);
                return {user, token: 'valid'};
            } catch (error) {
                return {user, token: 'invalid'};
            }
        } 
        return {user, token: ''};
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro!!! Salvem-se quem puder! Brincadeira, tenta denovo" });
    }
};

const newUser = async ({fullName, email, password }) => {
    try {
        const users = await getAll();
        for (const user of users) {
            if (user.email === email) {
                return { message: "email já registrado" };
            }
        }
    }
    catch (e) {
        return { message: "Erro interno"};
    }
    const token = jwt.sign({ email }, secret, {expiresIn: '1d'});
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Cadastro',
        html: `<p>Clique no link para concluir seu cadastro: <a href="http://localhost:3000/confirm/${token}"> Confirmar </a></p>`,
    }
    const newUser = await User.create({
        fullName, email, password, token
    });
    try {
        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    } catch (err) {
        console.log(err);
    }
    return newUser;
}

async function confirmUser ({ token }) {
    const user = await User.findOne({where: { token }});
    console.log("user:", user);
    if (user) {
        await User.update({ isConfirmed: true }, { where: { token }});
        return user;
    };
    return null;
};

async function sendConfirmation(userId) {
    console.log(typeof userId);
    const { email } = await User.findByPk(userId);
    const token = jwt.sign({ email }, secret, {expiresIn: '1d'});
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Cadastro',
        html: `<p>Clique no link para concluir seu cadastro: <a href="http://localhost:3000/confirm/${token}"> Confirmar </a></p>`,
    }
    const newTokenUser = await User.update({
        token
    }, { where: { email }});
    console.log(newTokenUser, "hahaha");
    try {
        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    } catch (err) {
        console.log(err);
    }
    return newTokenUser;
}

module.exports = {
    getAll,
    newUser,
    getUserById,
    confirmUser,
    sendConfirmation,
}