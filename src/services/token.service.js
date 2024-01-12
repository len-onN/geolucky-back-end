const { Token, User } = require('../models');
const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const transporter = require('../utils/email');

const newToken = async (userId) => {
    const { email } = await User.findByPk(userId);
    const token = jwt.sign({userId}, secret, { expiresIn: "1d" });
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Cadastro',
        html: `<p>Clique no link para concluir seu cadastro: <a href="http://localhost:3000/confirm/${token}"> Confirmar </a></p>`,
    };
    const newToken = await Token.create({ token, userId });
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
    };
    return newToken;
};

const isUserTokenValid = async (userId) => {
    try {
        const token = await Token.findOne({ where: { userId }});
        // console.log("token: ", token);
        // let newToken = "";
        if (token && !token.isConfirmed) {
            try {
                const tokenValid = jwt.verify(token.token, secret);
                return { user: token, token: 'valid'};
            } catch (error) {
                return { user: token, token: 'invalid'};
            }
        } 
        return { user: token, token: '' };
    }
    catch (err) {
        return err;
    }
};

async function confirmUserToken ({ token }) {
    const userToken = await Token.findOne({where: { token }});
    console.log("user:", userToken);
    if (userToken) {
        const some = await Token.update({ isConfirmed: true }, { where: { token }});
        return some;
    };
    return null;
};

async function sendConfirmationToken(userId) {
    const { email } = await User.findByPk(userId);
    const token = jwt.sign({ email }, secret, {expiresIn: '1d'});
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Cadastro',
        html: `<p>Clique no link para concluir seu cadastro: <a href="http://localhost:3000/confirm/${token}"> Confirmar </a></p>`,
    }
    const newTokenUser = await Token.update({
        token
    }, { where: { userId }});
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
    newToken,
    isUserTokenValid,
    confirmUserToken,
    sendConfirmationToken
};