const logger = require('../../config/loggers');
const PostsService = require('../../layerd/services/posts.service');

class PostsController {
  postsService = new PostsService();
  createPost = async (req, res) => {
    // const { userId } = res.locals.user;
    const userId = 1;
    console.log(req.file);
    console.log(req.body);
    const coverImageFile = req.file.location;
    const { title, content } = req.body;

    await this.postsService.createPost(userId, title, content, coverImageFile);
    return res.status(201).json({ message: '생성완료' });
  };
}

module.exports = PostsController;
