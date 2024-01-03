const { User } = require('../models');

const getAll = async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
};

const getUserById = async (userId) => {
    console.log(typeof userId === 'string')
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    try {
        const users = await User.findByPk(userId);
        return users;
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
            if (user.fullName === fullName) {
                return { message: "nome já registrado" };
            } else if (user.email === email) {
                return { message: "email já registrado" };
            }
        }
    }
    catch (e) {
        return { message: "Erro interno"};
    }
    const newUser = await User.create({
        fullName, email, password
    });
    return newUser;
}

module.exports = {
    getAll,
    newUser,
    getUserById,
}