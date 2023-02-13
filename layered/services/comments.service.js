const CommentsRepository = require('../repositories/comments.repository');

const { Comments, Posts } = require('../../models');
class CommentsService {
  commentsRepository = new CommentsRepository(Comments, Posts);

  createComment = async (postId, content, userId) => {
    const postData = await this.commentsRepository.findPost(postId);

    if (!postData) {
      throw { message: '없는 게시물입니다.', result: 'false', code: 404 };
    }
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
