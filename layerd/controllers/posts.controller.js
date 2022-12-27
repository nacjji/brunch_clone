const logger = require('../../config/loggers');
const PostsService = require('../../layerd/services/posts.service');

class PostsController {
  postsService = new PostsService();
  createPost = async (req, res) => {
    const { userId } = res.locals;
    const coverImageFile = req.file.location;

    const { title, subtitle, content } = req.body;
    try {
      await this.postsService.createPost(
        userId,
        title,
        subtitle,
        content,
        coverImageFile,
      );
      return res.status(201).json({ message: '생성완료' });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      res.status(error.status).json({ error: error.message });
    }
  };

  findAllPosts = async (req, res) => {
    try {
      const { p } = req.query;

      const posts = await this.postsService.findAllPosts(p);
      return res.status(200).json({ result: posts });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      res.status(error.status).json({ error: error.message });
    }
  };

  findDetailPost = async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await this.postsService.findDetailPost(postId);
      return res.status(200).json({ result: post });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      res.status(error.status).json({ error: error.message });
    }
  };

  myFindDetailPosts = async (req, res) => {
    const { userId } = res.locals;

    try {
      const posts = await this.postsService.myFindDetailPosts(userId);
      return res.status(200).json({ result: posts });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      res.status(error.status).json({ error: error.message });
    }
  };

  updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    if (req.file) {
      const coverImageFile = req.file.location;
      await this.postsService.updatePost(
        postId,
        title,
        content,
        coverImageFile,
      );
    }
    try {
      await this.postsService.updatePost(postId, title, content);
      return res.status(201).json({ result: '게시글 수정 완료' });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      return res.status(error.status).json({ error: error.message });
    }
  };

  deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
      await this.postsService.deletePost(postId);
      return res.status(201).json({ result: '게시글 삭제 완료' });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      return res.status(error.status).json({ error: error.message });
    }
  };

  restorePost = async (req, res) => {
    const { postId } = req.params;

    try {
      await this.postsService.restorePost(postId);
      return res.status(201).json({ result: '게시글 복구 완료' });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      return res.status(error.status).json({ error: error.message });
    }
  };
}

module.exports = PostsController;
