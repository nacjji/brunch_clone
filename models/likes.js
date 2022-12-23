'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Posts, { foreignKey: 'postId' });
      this.belongsTo(models.KakaoUsers, { foreignKey: 'userId' });
    }
  }
  Likes.init(
    {
      likesId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Likes',
    },
  );
  return Likes;
};
