const PointService = require('../services/point.service');

const newPointController = async (req, res) => {
    try {
        const { lat, lng, userId } = req.body;
        const newPoint = await PointService.newPoint({ lat, lng, userId });
        return res.status(201).json(newPoint);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

const checkPointController = async (req, res) => {
    const { userId } = req.body;
    const noPointBool = await PointService.checkPoint({ userId});
    return res.status(200).json(noPointBool);
};

const getAllPointsController = async (req, res) => {
    const allPoints = await PointService.getAllPoints();
    return res.status(200).json(allPoints);
};

module.exports = { newPointController, checkPointController, getAllPointsController };