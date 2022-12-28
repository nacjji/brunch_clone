const PostsRepository = require('../repositories/posts.repository');
const CommentsRepository = require('../../layerd/repositories/comments.repository');
const LikesRepository = require('../../layerd/repositories/likes.repository');
const UserInfoRepository = require('../../layerd/repositories/writerInfo.repository');
const UsersRepository = require('../../layerd/repositories/users.repository');
const { Posts, Likes, Comments, Users } = require('../../models');
const { UnexpectedError } = require('../../middlewares/custom-exception');

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
  };

  findAllPosts = async (p) => {
    const posts = await this.postRepository.findAllPosts(p);

    const result = { ...posts };
    return result;
  };

  searchPost = async (search) => await this.postRepository.searchPost(search);

  findDetailPost = async (postId) => {
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

  updatePost = async (postId, title, subtitle, content, coverImageFile) =>
    await this.postRepository.updatePost(
      postId,
      title,
      subtitle,
      content,
      coverImageFile,
    );
  deletePost = async (postId) => {
    await this.postRepository.deletePost(postId);
  };

  restorePost = async (postId) => {
    await this.postRepository.restorePost(postId);
  };
}

module.exports = PostsService;
