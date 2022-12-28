const { Sequelize } = require('../../models');
const { UnexpectedError } = require('../../middlewares/custom-exception');
const { Users } = require('../../models');
class FollowRepository {
  constructor(followsModel, usersModel) {
    this.followsModel = followsModel;
    this.usersModel = usersModel;
  }

  followUser = async (userId, interestUser) => {
    if (userId === interestUser) {
      throw new UnexpectedError('나를 팔로우할 수 없습니다.', 400);
    }
    const existUser = await Users.findOne({
      where: { userId: interestUser },
      raw: true,
    });
    if (!existUser) {
      throw new UnexpectedError('존재하지 않는 사용자', 400);
    }
    const isfollowed = await this.followsModel.findAll({
      where: { userId },
      raw: true,
    });
    for (const i of isfollowed) {
      if (i.interestUser === interestUser) {
        await this.followsModel.destroy({ where: { userId, interestUser } });
        return { message: '구독 취소' };
      }
    }
    await this.followsModel.create({ userId, interestUser });
    return { message: '구독' };
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
