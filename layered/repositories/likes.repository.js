const {
  UnexpectedError,
  NotFoundError,
} = require('../../middlewares/custom-exception');
const Sequelize = require('sequelize');
class LikesRepository {
  constructor(likesModel, postModel) {
    this.likesModel = likesModel;
    this.postModel = postModel;
  }

  likePost = async (postId, userId) => {
    await this.likesModel.create({ postId, userId });
    return { message: 'like' };
  };

  isLiked = async (postId, userId) => {
    await this.likesModel.findOne({ where: { postId, userId } });
  };

  unLike = async (postId, userId) => {
    await this.likesModel.destroy({ where: { postId, userId } });
    return { message: 'dislike' };
  };

  likeCount = async (postId) => {
    const count = await this.likesModel.findAll({
      where: { postId },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('likeId')), 'LikesCount'],
      ],
      raw: true,
    });
    return count[0];
  };
}

module.exports = LikesRepository;
