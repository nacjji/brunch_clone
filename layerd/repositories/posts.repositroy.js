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
}
module.exports = PostsRepository;
