const PostsRepository = require('../../layerd/repositories/posts.repositroy');
const { Posts } = require('../../models');
class PostsService {
  constructor() {
    this.postRepository = new PostsRepository(Posts);
  }
  createPost = async (userId, title, content, coverImageFile) =>
    await this.postRepository.createPost(
      userId,
      title,
      content,
      coverImageFile,
    );

  findAllPosts = async () => {
    const posts = await this.postRepository.findAllPosts();
    return posts;
  };
}

module.exports = PostsService;
