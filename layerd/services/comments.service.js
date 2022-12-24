const CommentsRepository = require('../repositories/comments.repository');

const { Comments } = require('../../models');
class CommentsService {
  commentsRepository = new CommentsRepository(Comments);

  createComment = async (postId, content, userId) => {
    await this.commentsRepository.createComment(postId, content, userId);
  };
}

module.exports = CommentsService;
