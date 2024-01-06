// src/models/user.model.js

const PointModel = (sequelize, DataTypes) => {
    const Point = sequelize.define('Point', {
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      underscored: true,
      tableName: 'points',
    });
    Point.associate = (models) => {
        Point.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        })
        Point.belongsToMany(models.Raffle, {
          through: 'RafflePoints', // Nome da tabela de junção
          foreignKey: 'pointId',
          otherKey: 'raffleId',
          as: 'raffles',
        });
    }

  
    return Point;
  };
  
  module.exports = PointModel;