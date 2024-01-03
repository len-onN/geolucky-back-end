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
      underscored: true, // Adicionado para seguir a convenção "underscored"
    });
    User.associate = (models) => {
      User.hasMany(models.Point, {
        foreignKey: 'user_id', // Nome da chave estrangeira na tabela Point
        as: 'points', // Nome da propriedade no código
      });
    };
  
    return User;
  };
  
  module.exports = UserModel;