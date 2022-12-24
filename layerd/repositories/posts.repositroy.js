const { UnexpectedError } = require('../../middlewares/custom-exception');

class PostsRepository {
  constructor(PostsModel) {
    this.postsModel = PostsModel;
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
    await this.postsModel.findAll();
  };

  // 게시글 상세조회
  findDetailPost = async (postId) => {
    const post = await this.postsModel.findOne({ where: { postId } });
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
    const post = await this.postsModel.destroy({ where: { postId } });
    if (!post) {
      throw new UnexpectedError('없는 게시글입니다.', 404);
    }
    return post;
  };
}
module.exports = PostsRepository;
