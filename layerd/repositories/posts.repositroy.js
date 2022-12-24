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
  findAllPosts = async () => await this.postsModel.findAll();

  // 게시글 상세조회
  findDetailPost = async (postId) =>
    await this.postsModel.findOne({ where: { postId } });

  updatePost = async (postId, title, content, coverImageFile) => {
    const findPostForUpdate = await this.postsModel.findOne({
      where: { postId },
    });
    if (!findPostForUpdate) {
      // TODO: throw NotFound Error
    }

    await this.postsModel.update(
      { title, content, coverImage: coverImageFile },
      { where: { postId } },
    );
  };

  deletePost = async (postId) =>
    await this.postsModel.destroy({ where: { postId } });
}
module.exports = PostsRepository;
