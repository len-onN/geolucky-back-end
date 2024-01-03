const { LoginService } = require('../services/login.service');

const LoginController = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    const { email, password } = req.body;
    try {
        const { token, userId } = await LoginService({email, password});
        return res.status(200).json({ token, userId });
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = { LoginController };