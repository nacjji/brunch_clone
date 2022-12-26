const { UnexpectedError } = require('../../middlewares/custom-exception');

class PostsRepository {
  constructor(postsModel, likesModel, commentModel) {
    this.postsModel = postsModel;
    this.likesModel = likesModel;
    this.commentModel = commentModel;
  }
  createPost = async (userId, title, content, coverImageFile) => {
    const createPost = await this.postsModel.create({
      userId,
      title,
      content,
      coverImage: coverImageFile,
    });
    return createPost;
  };

  // 전체 게시글 조회
  findAllPosts = async () => {
    return await this.postsModel.findAll({ paranoid: false });
  };

  // 게시글 상세조회
  // 댓글 userId에 해당하는 닉네임, 내용만 가져오기
  // 좋아요 개수만 가져오기
  findDetailPost = async (postId) => {
    const post = await this.postsModel.findOne({
      where: { postId },
      include: [{ model: this.likesModel }, { model: this.commentModel }],
      required: true,
    });
    if (!post) {
      throw new UnexpectedError('없는 게시글입니다.', 404);
    }
    return post;
  };

  updatePost = async (postId, title, content, coverImageFile) => {
    const findPostForUpdate = await this.postsModel.findOne({
      where: { postId },
    });
    if (!findPostForUpdate) {
      throw new UnexpectedError('없는 게시글입니다.', 404);
    }

    const post = await this.postsModel.update(
      { title, content, coverImage: coverImageFile },
      { where: { postId } },
    );
    return post;
  };

  deletePost = async (postId) => {
    const post = await this.postsModel.destroy({
      where: { postId },
    });
    if (!post) {
      throw new UnexpectedError('없는 게시글입니다.', 404);
    }
    return post;
  };

  // 삭제 복구
  restorePost = async (postId, deletedAt) => {
    const restore = await this.postsModel.restore({ where: { postId } });
    const isDeleted = await this.postsModel.findOne({
      where: { deletedAt: null },
    });
    console.log(isDeleted.deletedAt);

    if (isDeleted.deletedAt) {
      throw new UnexpectedError('삭제되지 않은 게시글입니다.', 400);
    }
    return restore;
  };
}
module.exports = PostsRepository;
