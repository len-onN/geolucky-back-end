// src/models/user.model.js

const TokenModel = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
      token: DataTypes.STRING,
      isConfirmed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
      timestamps: false,
    });
    Token.associate = (models) => {
      Token.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'tokens',
      });
    };
  
    return Token;
  };
  
  module.exports = TokenModel;