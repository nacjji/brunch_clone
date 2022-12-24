class CommentsRepository {
  constructor(CommentModel) {
    this.commentModel = CommentModel;
  }

  createComment = async (postId, content, userId) => {
    const comment = await this.commentModel.create({ postId, content, userId });

    return comment;
  };
}

module.exports = CommentsRepository;
