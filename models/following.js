'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Followings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.KakaoUsers, { foreignKey: 'userId' });
    }
  }
  Followings.init(
    {
      followingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Followings',
    },
  );
  return Followings;
};
