const { Op, literal } = require('sequelize');
const { Point } = require('../models');

const newPoint = async ({ lat, lng, userId }) => {
    const newPoint = await Point.create({ lat, lng, userId });
    return newPoint;
}

const getAllPoints = async () => {
    const allPoints = await Point.findAll();
    return allPoints;
};

const checkPoint = async ({ userId }) => {
    const point = await Point.findOne({
        where: {
            userId,
            createdAt: {
                [Op.between]: [
                    literal('DATE_SUB(CURDATE(), INTERVAL (DAYOFWEEK(CURDATE()) + 5) % 7 DAY)'),
                    literal('NOW()')
                ],
            },
        },
        order: [['createdAt', 'DESC']],
    });

    return point;
};

module.exports = {
    newPoint,
    checkPoint,
    getAllPoints,
};
