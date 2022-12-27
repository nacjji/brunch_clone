const { Sequelize } = require('sequelize');
class FollowRepository {
  constructor(followsModel) {
    this.followsModel = followsModel;
  }

  followUser = async (userId, interestUser) => {
    const isfollowed = await this.followsModel.findAll({ where: { userId } });
    if (isfollowed.length) {
      await this.followsModel.destroy({ where: { userId, interestUser } });
      return { message: '팔로우 취소' };
    }
    await this.followsModel.create({ userId, interestUser });
    return { message: '팔로우' };
  };
}

module.exports = FollowRepository;
