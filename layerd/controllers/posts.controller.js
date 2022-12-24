const logger = require('../../config/loggers');
const PostsService = require('../../layerd/services/posts.service');

class PostsController {
  postsService = new PostsService();
  createPost = async (req, res) => {
    // const { userId } = res.locals.user;
    const userId = 1;
    const coverImageFile = req.file.location;
    const { title, content } = req.body;
    await this.postsService.createPost(userId, title, content, coverImageFile);
    return res.status(201).json({ message: '생성완료' });
  };

  findAllPosts = async (req, res) => {
    const posts = await this.postsService.findAllPosts();
    return res.status(200).json({ result: posts });
  };
}

module.exports = PostsController;
