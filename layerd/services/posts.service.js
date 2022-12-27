const PostsRepository = require('../repositories/posts.repository');
const CommentsRepository = require('../../layerd/repositories/comments.repository');
const LikesRepository = require('../../layerd/repositories/likes.repository');
const UserInfoRepository = require('../../layerd/repositories/writerInfo.repository');
const { Posts, Likes, Comments, Users, Follow } = require('../../models');

class PostsService {
  constructor() {
    this.postRepository = new PostsRepository(Posts, Likes, Comments);
    this.likesRepository = new LikesRepository(Likes, Posts);
    this.commentRepository = new CommentsRepository(Comments, Posts);
    this.userInfoRepository = new UserInfoRepository(Users);
  }

  createPost = async (userId, title, subtitle, content, coverImageFile) =>
    await this.postRepository.createPost(
      userId,
      title,
      subtitle,
      content,
      coverImageFile,
    );

  findAllPosts = async (p) => await this.postRepository.findAllPosts(p);

  searchPost = async (search) => await this.postRepository.searchPost(search);

  findDetailPost = async (postId, userId) => {
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
