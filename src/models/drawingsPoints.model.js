// src/models/rafflePoints.model.js

const RafflePointsModel = (sequelize, DataTypes) => {
    const RafflePoints = sequelize.define('RafflePoints', {
      pointId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      raffleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
      tableName: 'raffle_points',
    });
  
    return RafflePoints;
  };
  
  module.exports = RafflePointsModel;
  