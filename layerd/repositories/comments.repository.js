class CommentsRepository {
  constructor(CommentModel) {
    this.commentModel = CommentModel;
  }

  findComment = async (commentId) => {
    const findCommentData = await this.commentModel.findOne({
      where: { commentId },
    });

    return findCommentData;
  };

  createComment = async (postId, content, userId) => {
    const createComment = await this.commentModel.create({
      postId,
      content,
      userId,
    });

    return createComment;
  };

  updateComment = async (commentId, content) => {
    const updateComment = await this.commentModel.update(
      { content },
      { where: { commentId } },
    );

    return updateComment;
  };

  deleteComment = async (commentId) => {
    const deleteComment = await this.commentModel.destroy({
      where: { commentId },
    });

    return deleteComment;
  };
}

module.exports = CommentsRepository;
