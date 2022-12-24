const CommentsService = require('../services/comments.service');

class CommentsController {
  commentsService = new CommentsService();

  createComment = async (req, res, next) => {
    const { postId } = req.params;
    const { content } = req.body;
    //const { userId } = res.locals.user;

    let userId = 1;
    try {
      await this.commentsService.createComment({ postId, content, userId });
      res
        .status(201)
        .json({ result: 'true', message: '댓글 작성에 성공하였습니다.' });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ result: 'false', message: '댓글 작성에 실패하였습니다.' });
    }
  };
}

module.exports = CommentsController;
