class LikesRepository {
  constructor(likesModel) {
    this.likesModel = likesModel;
  }

  likePost = async (postId, userId) => {
    const isLike = await this.likesModel.findAll({ where: { postId, userId } });
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
