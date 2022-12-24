const CommentsRepository = require('../repositories/comments.repository');

const { Comments } = require('../../models');
const { AsyncQueueError } = require('sequelize');
class CommentsService {
  commentsRepository = new CommentsRepository(Comments);

  createComment = async (postId, content, userId) => {
    await this.commentsRepository.createComment(postId, content, userId);
  };

  updateComment = async (commentId, content, userId) => {
    const findCommentData = await this.commentsRepository.findComment(
      commentId,
    );

    if (userId !== findCommentData.userId) {
      throw { message: '작성자가 아닙니다.', result: 'false', code: 401 };
    } else {
      await this.commentsRepository.updateComment(commentId, content);
    }
  };

  deleteComment = async (commentId, userId) => {
    const findCommentData = await this.commentsRepository.findComment(
      commentId,
    );
    if (userId !== findCommentData.userId) {
      throw { message: '작성자가 아닙니다.', result: 'false', code: 401 };
    } else {
      await this.commentsRepository.deleteComment(commentId);
    }
  };
}

module.exports = CommentsService;
