const UserService = require('../services/user.service');

const getAllController = async (_req, res) => {
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

const getUserById = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    const { id } = req.params;
    console.log("id:", parseInt(id));
    try {
        const user = await UserService.getUserById(parseInt(id));
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const newUserController = async (req, res) => {
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


async function sendConfirmationController(req, res) {
    const { userId } = req.body;
    const response = await UserService.sendConfirmation(userId);
    return res.status(200).json(response);
};

module.exports = {
    getAllController,
    newUserController,
    getUserById,
    sendConfirmationController,
};