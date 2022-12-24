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
}

module.exports = PostsRepository;
