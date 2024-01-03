const UserService = require('../services/user.service');

const getAll = async (_req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    try {
        const users = await UserService.getAll();
        return res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro!!! Salvem-se quem puder! Brincadeira, tenta denovo" });
    }
};

const newUser = async (req, res) => {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    try {
        const { fullName, email, password } = req.body;
        const newUser = await UserService.newUser({ fullName, email, password });
        return res.status(201).json(newUser);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ERRO! Corram para as montanhas! Zoeira, volta aqui e tente outra vez' });
    }
}

module.exports = {
    getAll,
    newUser,
};