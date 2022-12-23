'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.KakaoUsers, { foreignKey: 'userId' });
      this.belongsTo(models.Posts, { foreignKey: 'postId' });
    }
  }
  Comments.init(
    {
      commentId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Comments',
    },
  );
  return Comments;
};
