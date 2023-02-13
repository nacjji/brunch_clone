const { Sequelize } = require('sequelize');
class FollowRepository {
  constructor(followsModel, usersModel) {
    this.followsModel = followsModel;
    this.usersModel = usersModel;
  }

  followUser = async (userId, interestUser) => {
    await this.followsModel.create({ userId, interestUser });
    return { message: '구독' };
  };

  unFollowUser = async (userId, interestUser) => {
    await this.followsModel.destroy({ where: { userId, interestUser } });
    return { message: '구독 취소' };
  };

  isFollowed = async (userId) => {
    await this.followsModel.findAll({ where: { userId } });
  };

  existUser = async (userId) => {
    await Users.findOne({ where: { userId } });
  };

  interestUser = async (userId) => {
    const count = await this.followsModel.findAll({
      where: { userId },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('userId')), 'interestUser'],
      ],
      raw: true,
    });
    return count[0];
  };

  subscriber = async (interestUser) => {
    const count = await this.followsModel.findAll({
      where: { interestUser },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('interestUser')), 'subscriber'],
      ],
      raw: true,
    });
    return count[0];
  };
}

module.exports = FollowRepository;
