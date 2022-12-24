'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Followers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.KakaoUsers, { foreignKey: 'userId' });
    }
  }
  Followers.init(
    {
      followerId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Followers',
    },
  );
  return Followers;
};
