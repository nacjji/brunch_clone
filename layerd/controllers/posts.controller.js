const logger = require('../../config/loggers');
const PostsService = require('../../layerd/services/posts.service');

class PostsController {
  postsService = new PostsService();
  createPost = async (req, res) => {
    // const { userId } = res.locals.user;
    const userId = 1;
    const coverImageFile = req.file.location;
    console.log(
      '🚀 ~ file: posts.controller.js:10 ~ PostsController ~ createPost= ~ coverImageFile',
      req.file,
    );
    console.log(coverImageFile);
    const { title, content } = req.body;
    try {
      await this.postsService.createPost(
        userId,
        title,
        content,
        coverImageFile,
      );
      return res.status(201).json({ message: '생성완료' });
    } catch (error) {
      console.log(error);
      res.status(error).json({ message: error.message });
    }
  };

  findAllPosts = async (req, res) => {
    try {
      const posts = await this.postsService.findAllPosts();
      return res.status(200).json({ result: posts });
    } catch (error) {
      console.log(error);
      res.status(error.status).json({ error: error.message });
    }
  };

  findDetailPost = async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await this.postsService.findDetailPost(postId);
      return res.status(200).json({ result: post });
    } catch (error) {
      console.log(error);
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
      return res.status(error.status).json({ error: error.message });
    }
  };

  deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
      await this.postsService.deletePost(postId);
      return res.status(201).json({ result: '게시글 삭제 완료' });
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  };

  restorePost = async (req, res) => {
    const { postId } = req.params;

    try {
      await this.postsService.restorePost(postId);
      return res.status(201).json({ result: '게시글 복구 완료' });
    } catch (error) {
      console.log(error);
      return res.status(error.status).json({ error: error.message });
    }
  };
}

module.exports = PostsController;
