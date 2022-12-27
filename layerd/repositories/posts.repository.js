const { Op } = require('sequelize');
const { UnexpectedError } = require('../../middlewares/custom-exception');

class PostsRepository {
  constructor(postsModel, likesModel, commentModel) {
    this.postsModel = postsModel;
    this.likesModel = likesModel;
    this.commentModel = commentModel;
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
  // findAllPosts = async () => {
  //   return await this.postsModel.findAll({ paranoid: false });
  // };

  findAllPosts = async (p) => {
    const where = {};

    if (parseInt(p, 10)) {
      where.postId = { [Op.lt]: parseInt(p, 10) };
    }
    const allPosts = await this.postsModel.findAll({
      where,
      limit: 20,
      order: [['createdAt', 'DESC']],
    });
    console.log(allPosts.length);
    return allPosts;
  };
  // localhost:3000/api/post?p=1 1~20
  // localhost:3000/api/post?postId=2 21~40
  //            ...

  // 게시글 상세조회
  // 댓글 userId에 해당하는 닉네임, 내용만 가져오기
  // 좋아요 개수만 가져오기
  findDetailPost = async (postId) => {
    const post = await this.postsModel.findOne({
      where: { postId },
      raw: true,
    });
    if (!post) {
      throw new UnexpectedError('없는 게시글입니다.', 404);
    }

    return post;
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
    if (!findPostForUpdate) {
      throw new UnexpectedError('없는 게시글입니다.', 404);
    }

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
    if (!post) {
      throw new UnexpectedError('없는 게시글입니다.', 404);
    }
    return post;
  };

  // 삭제 복구
  restorePost = async (postId, deletedAt) => {
    const restore = await this.postsModel.restore({ where: { postId } });
    const isDeleted = await this.postsModel.findOne({
      where: { deletedAt: null },
    });
    console.log(isDeleted.deletedAt);
    if (!restore) {
      throw new UnexpectedError('없는 게시글입니다.', 400);
    }
    if (isDeleted.deletedAt) {
      throw new UnexpectedError('삭제되지 않은 게시글입니다.', 400);
    }
    return restore;
  };
}
module.exports = PostsRepository;
