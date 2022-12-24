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
      this.hasMany(models.Followers, { foreignKey: 'userId' });
      this.hasMany(models.Followings, { foreignKey: 'userId' });
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
      profileImage: DataTypes.STRING,
      selfIntro: DataTypes.STRING,
      accessToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'KakaoUsers',
    },
  );
  return KakaoUsers;
};
