const RaffleService = require('../services/raffles.service');

const getAllRaffles = async (_req, res) => {
    const raffles = await RaffleService.getRaffleDetails();
    res.status(200).json(raffles);
};

module.exports = { getAllRaffles };