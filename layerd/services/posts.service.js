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
}

module.exports = PostsService;
