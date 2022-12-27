const { UnexpectedError } = require('../../middlewares/custom-exception');
const Sequelize = require('sequelize');
class LikesRepository {
  constructor(likesModel, postModel) {
    this.likesModel = likesModel;
    this.postModel = postModel;
  }

  likePost = async (postId, userId) => {
    const existPost = await this.postModel.findOne({ where: { postId } });

    const isLike = await this.likesModel.findAll({ where: { postId, userId } });
    if (!existPost) {
      throw new UnexpectedError('없는 게시글입니다.', 404);
    }
    if (isLike.length) {
      await this.likesModel.destroy({ where: { postId, userId } });
      return { message: 'dislike' };
    }
    await this.likesModel.create({ postId, userId });
    return { message: 'like' };
  };

  likeCount = async (postId) => {
    const count = await this.likesModel.findAll({
      where: { postId },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('likeId')), 'LikesCount'],
      ],
      raw: true,
    });
    //
    return count[0];
  };
}

module.exports = LikesRepository;
