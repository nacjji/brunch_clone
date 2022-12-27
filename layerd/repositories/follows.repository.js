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

// 프론트에서 1차적으로 막는 부분도 에러처리를 해야하는지
// ex) 게시글에 댓글을 작성할 때 params로 받아오는 값이 postId인데
// 어차피 프론트에서 없는 글에 댓글을 못달게 할텐데 이걸 에러처리를 해야하나
