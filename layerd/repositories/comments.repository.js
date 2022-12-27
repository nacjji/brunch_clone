const Sequelize = require('sequelize');
const { Users } = require('../../models');

class CommentsRepository {
  constructor(CommentModel, PostModel) {
    this.commentModel = CommentModel;
    this.postModel = PostModel;
  }

  findComment = async (commentId) => {
    const findCommentData = await this.commentModel.findOne({
      where: { commentId },
    });

    return findCommentData;
  };

  findComments = async (postId) => {
    const findComments = await this.commentModel.findAll({
      where: { postId },
      include: {
        model: Users,
        attributes: ['profileImage'],
      },
      raw: true,
    });
    console.log(findComments);
    return findComments;
  };

  findPost = async (postId) => {
    const postData = await this.postModel.findOne({
      where: { postId },
    });

    return postData;
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

  commentCount = async (postId) => {
    const count = await this.commentModel.findAll({
      where: { postId },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('commentId')), 'CommentsCount'],
      ],
      raw: true,
    });

    return count[0];
  };
}

module.exports = CommentsRepository;
