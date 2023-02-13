const { Op } = require('sequelize');
const { UnexpectedError } = require('../../middlewares/custom-exception');
const { Users, Sequelize } = require('../../models');
class PostsRepository {
  constructor(postsModel, likesModel, commentModel, userModel) {
    this.postsModel = postsModel;
    this.likesModel = likesModel;
    this.commentModel = commentModel;
    this.userModel = userModel;
  }

  createPost = async (userId, title, subtitle, content, coverImageFile) => {
    const createPost = await this.postsModel.create({
      userId,
      title,
      subtitle,
      content,
      coverImage: coverImageFile,
    });
    return createPost;
  };

  // 전체 게시글 조회
  findAllPosts = async (page) => {
    const where = {};

    if (parseInt(page, 10)) {
      where.postId = { [Op.lt]: parseInt(page, 10) };
    }
    const posts = await this.postsModel.findAll({
      raw: true,
    });

    const lastPost = posts[0].postId;
    const allPosts = await this.postsModel.findAll({
      include: [{ model: Users, attributes: [] }],
      attributes: [
        'postId',
        'userId',
        'title',
        'subtitle',
        'content',
        'coverImage',
        'createdAt',
        'updatedAt',
        'deletedAt',
        [Sequelize.col('writer'), 'writer'],
      ],
      where,
      limit: 20,
      raw: true,
      order: [['createdAt', 'DESC']],
    });

    return [allPosts, lastPost];
  };

  //게시글 검색
  searchPost = async (search) => {
    const posts = await this.postsModel.findAll({
      include: [{ model: Users, attributes: [] }],
      attributes: [
        'postId',
        'userId',
        'title',
        'subtitle',
        'content',
        'coverImage',
        'createdAt',
        'updatedAt',
        'deletedAt',
        [Sequelize.col('writer'), 'writer'],
      ],
      raw: true,
      where: {
        [Op.or]: [
          {
            title: { [Op.like]: '%' + search + '%' },
          },
          {
            subtitle: { [Op.like]: '%' + search + '%' },
          },
          {
            content: { [Op.like]: '%' + search + '%' },
          },
        ],
      },
    });
    return posts;
  };

  // 게시글 상세조회
  findDetailPost = async (postId) => {
    return post;
  };

  // 게시글 존재 여부
  postExist = async (postId) => {
    await this.postsModel.findOne({
      where: { postId },
      raw: true,
    });
  };

  //내가 쓴 글 보기
  myFindDetailPosts = async (userId) => {
    const posts = await this.postsModel.findAll({ where: { userId } });
    return posts;
  };

  updatePost = async (postId, title, subtitle, content, coverImageFile) => {
    const findPostForUpdate = await this.postsModel.findOne({
      where: { postId },
    });
    const post = await this.postsModel.update(
      { title, subtitle, content, coverImage: coverImageFile },
      { where: { postId } },
    );
    return post;
  };

  deletePost = async (postId) => {
    const post = await this.postsModel.destroy({
      where: { postId },
    });
    return post;
  };

  // 삭제 복구
  restorePost = async (postId) => {
    const restore = await this.postsModel.restore({ where: { postId } });
    return restore;
  };

  isNotDeleted = async (postId) => {
    await this.postsModel.findOne({
      where: { and: [{ postId }, { deletedAt: null }] },
    });
  };
}
module.exports = PostsRepository;
