'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.hasMany(models.Users, { foreignKey: 'userId' });
    }
  }
  Follows.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.INTEGER,
      // 관심작가
      interestUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Follows',
    },
  );
  return Follows;
};
