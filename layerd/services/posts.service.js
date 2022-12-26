const PostsRepository = require('../../layerd/repositories/posts.repositroy');
const CommentsRepository = require('../../layerd/repositories/comments.repository');
const LikesRepository = require('../../layerd/repositories/likes.repository');

const { Posts, Likes, Comments } = require('../../models');

class PostsService {
  constructor() {
    this.postRepository = new PostsRepository(Posts, Likes, Comments);
    this.likesRepository = new LikesRepository(Likes, Posts);
    this.commentRepository = new CommentsRepository(Comments, Posts);
  }

  createPost = async (userId, title, content, coverImageFile) =>
    await this.postRepository.createPost(
      userId,
      title,
      content,
      coverImageFile,
    );

  findAllPosts = async () => await this.postRepository.findAllPosts();

  findDetailPost = async (postId) => {
    const detailPost = await this.postRepository.findDetailPost(postId);
    const likeCount = await this.likesRepository.likeCount(postId);
    const commentCount = await this.commentRepository.commentCount(postId);

    const result = {
      ...detailPost,
      ...likeCount,
      ...commentCount,
    };
    return result;
  };

  updatePost = async (postId, title, content, coverImageFile) =>
    await this.postRepository.updatePost(
      postId,
      title,
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
