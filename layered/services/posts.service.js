const PostsRepository = require('../repositories/posts.repository');
const CommentsRepository = require('../../layered/repositories/comments.repository');
const LikesRepository = require('../../layered/repositories/likes.repository');
const UserInfoRepository = require('../../layered/repositories/writerInfo.repository');
const UsersRepository = require('../../layered/repositories/users.repository');
const { Posts, Likes, Comments, Users } = require('../../models');
const {
  UnexpectedError,
  NotFoundError,
} = require('../../middlewares/custom-exception');

class PostsService {
  constructor() {
    this.postRepository = new PostsRepository(Posts, Likes, Comments);
    this.likesRepository = new LikesRepository(Likes, Posts);
    this.commentRepository = new CommentsRepository(Comments, Posts);
    this.userInfoRepository = new UserInfoRepository(Users);
    this.usersRepository = new UsersRepository(Users);
  }

  createPost = async (
    userId,
    title,
    subtitle,
    content,
    coverImageFile,
    fileType,
  ) => {
    if (coverImageFile) {
      if (
        fileType === 'jpg' ||
        fileType === 'png' ||
        fileType === 'jpeg' ||
        fileType === 'gif' ||
        fileType === 'webp'
      ) {
        await this.postRepository.createPost(
          userId,
          title,
          subtitle,
          content,
          coverImageFile,
        );
      } else {
        throw new UnexpectedError('jpg,png,jpeg,gif,webp만 가능합니다', 400);
      }
    } else {
      return await this.postRepository.createPost(
        userId,
        title,
        subtitle,
        content,
        coverImageFile,
      );
    }
  };

  findAllPosts = async (page) => {
    const posts = await this.postRepository.findAllPosts(page);

    const result = { ...posts };
    return result;
  };

  searchPost = async (search) => await this.postRepository.searchPost(search);

  findDetailPost = async (postId) => {
    const postExist = await this.postRepository.postExist(postId);
    if (!postExist) throw new NotFoundError('없는 게시글입니다.', 404);

    const detailPost = await this.postRepository.findDetailPost(postId);
    const likeCount = await this.likesRepository.likeCount(postId);
    const commentCount = await this.commentRepository.commentCount(postId);
    const getWriterName = await this.userInfoRepository.writerInfo(
      detailPost.userId,
    );
    const comments = await this.commentRepository.findComments(postId);

    const result = {
      ...detailPost,
      ...likeCount,
      ...commentCount,
      ...getWriterName,
      comment: comments,
    };
    return result;
  };

  //내가 쓴 글 보기
  myFindDetailPosts = async (userId) => {
    const posts = await this.postRepository.myFindDetailPosts(userId);

    return posts;
  };

  updatePost = async (postId, title, subtitle, content, coverImageFile) => {
    const postExist = await this.postRepository.postExist(postId);
    if (!postExist) throw new NotFoundError('없는 게시글입니다.', 404);

    await this.postRepository.updatePost(
      postId,
      title,
      subtitle,
      content,
      coverImageFile,
    );
  };
  deletePost = async (postId) => {
    const postExist = await this.postRepository.postExist(postId);
    if (!postExist) throw new NotFoundError('없는 게시글입니다.', 404);

    await this.postRepository.deletePost(postId);
  };

  restorePost = async (postId) => {
    if (isDeleted.deletedAt) {
      throw new UnexpectedError('삭제되지 않은 게시글입니다.', 400);
    }

    const postExist = await this.postRepository.postExist(postId);
    if (!postExist) throw new NotFoundError('없는 게시글입니다.', 404);

    await this.postRepository.restorePost(postId);
  };
}

module.exports = PostsService;
