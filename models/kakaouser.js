'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KakaoUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Posts, { foreignKey: 'userId' });
      this.hasMany(models.Comments, { foreignKey: 'userId' });
      this.hasMany(models.Likes, { foreignKey: 'userId' });
    }
  }
  KakaoUsers.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      socialId: DataTypes.STRING,
      writer: DataTypes.STRING,
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      selfIntro: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accessToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'KakaoUsers',
    },
  );
  return KakaoUsers;
};
