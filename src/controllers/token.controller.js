const TokenService = require('../services/token.service');

const newTokenController = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    const { id } = req.params;
    try {
        const newToken = await TokenService.newToken(parseInt(id))
        return res.status(201).json(newToken);
    } catch (e) {
        return res.status(500).json({ error: e })
    };
    
};

const isUserTokenValidController = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    const { userId } = req.params;
    // console.log(typeof parseInt(userId));
    try {
        const token = await TokenService.isUserTokenValid(parseInt(userId));
        // console.log("token: ", token.user.userId, token.user.isConfirmed);
        return res.status(200).json(token);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const confirmUserTokenController = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    const { token } = req.body;
    const tokenRes = await TokenService.confirmUserToken({ token });
    if (tokenRes) {
        return res.status(200).json(tokenRes);
    } else {
        return res.status(500).json({ message: "user not foound" })
    }
};

const sendConfirmationTokenController = async (req, res) => {
    const { userId } = req.body;
    try {
        const response = await TokenService.sendConfirmationToken(userId);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }
};


module.exports = {
    newTokenController,
    isUserTokenValidController,
    confirmUserTokenController,
    sendConfirmationTokenController,
};