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
    const posts = await this.postsModel.findAll();
    return posts;
  };
}
module.exports = PostsRepository;
