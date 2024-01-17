// src/models/raffle.model.js

const RaffleModel = (sequelize, DataTypes) => {
    const Raffle = sequelize.define('Raffle', {
      winnerPointId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      drawnLat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      drawnLng: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      drawnStart: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      drawnEnd: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      underscored: true,
      tableName: 'raffles',
      timestamps: false,
    });
  
    Raffle.associate = (models) => {
      Raffle.belongsTo(models.Point, {
        foreignKey: 'winnerPointId',
        as: 'winnerPoint',
      });
    
      Raffle.belongsToMany(models.Point, {
        through: 'RafflePoints', // nome da tabela de ligação
        foreignKey: 'raffleId',
        as: 'competingPoints',
      });
    };
  
    return Raffle;
  };
  
  module.exports = RaffleModel;
  