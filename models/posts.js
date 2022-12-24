'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Likes, { foreignKey: 'postId' });
      this.hasMany(models.Comments, { foreignKey: 'postId' });
      this.belongsTo(models.KakaoUsers, { foreignKey: 'userId' });
    }
  }
  Posts.init(
    {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.INTEGER,
      coverImage: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Posts',
    },
  );
  return Posts;
};
