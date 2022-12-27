const logger = require('../../config/loggers');
const CommentsService = require('../services/comments.service');

class CommentsController {
  commentsService = new CommentsService();

  createComment = async (req, res, next) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = res.locals.userId;

    try {
      await this.commentsService.createComment(postId, content, userId);
      res
        .status(201)
        .json({ result: 'true', message: '댓글 작성에 성공하였습니다.' });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      res
        .status(error.code)
        .json({ result: error.result, errorMessage: error.message });
    }
  };

  updateComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = res.locals.userId;

    try {
      await this.commentsService.updateComment(commentId, content, userId);
      res
        .status(201)
        .json({ result: 'true', message: '댓글 수정에 성공하였습니다.' });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      if (error.code) {
        return res
          .status(error.code)
          .json({ message: error.message, result: error.result });
      } else {
        return res.status(400).json({
          result: 'false',
          errorMessage: '댓글 수정에 실패하였습니다.',
        });
      }
    }
  };

  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const userId = res.locals.userId;

    try {
      await this.commentsService.deleteComment(commentId, userId);
      res
        .status(201)
        .json({ result: 'false', message: '댓글 삭제에 성공하였습니다.' });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      if (error.code) {
        return res
          .status(error.code)
          .json({ message: error.message, result: error.result });
      } else {
        console.log(error);
        return res.status(400).json({
          result: 'false',
          errorMessage: '댓글 삭제에 실패하였습니다.',
        });
      }
    }
  };
}

module.exports = CommentsController;
