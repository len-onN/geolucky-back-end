// src/models/user.model.js

const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
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
    });
    User.associate = (models) => {
      User.hasMany(models.Point, {
        foreignKey: 'userId',
        as: 'points',
      });
    };
  
    return User;
  };
  
  module.exports = UserModel;