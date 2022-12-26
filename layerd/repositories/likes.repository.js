const { UnexpectedError } = require('../../middlewares/custom-exception');

class LikesRepository {
  constructor(likesModel, postModel) {
    this.likesModel = likesModel;
    this.postModel = postModel;
  }

  likePost = async (postId, userId) => {
    const existPost = await this.postModel.findOne({ where: { postId } });

    const isLike = await this.likesModel.findAll({ where: { postId, userId } });
    if (!existPost) {
      console.log(2);
      throw new UnexpectedError('없는 게시글입니다.', 404);
    }
    if (isLike.length) {
      await this.likesModel.destroy({ where: { postId } });
      return { message: '좋아요 취소' };
    }
    await this.likesModel.create({ postId, userId });
    return { message: '좋아요' };
  };

  // 좋아요한 게시글 조회, 게시글의 내용이 아닌 postId와 userId 만 가져온다.
  likedPost = async () => await this.likesModel.findAll({});
}

module.exports = LikesRepository;
