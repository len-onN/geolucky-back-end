const RaffleService = require('../services/raffles.service');

const getAllRafflesController = async (_req, res) => {
    const raffles = await RaffleService.getRaffleDetails();
    res.status(200).json(raffles);
};

module.exports = { getAllRafflesController };