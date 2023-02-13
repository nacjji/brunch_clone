const LikesRepository = require('../../layered/repositories/likes.repository');
const { UnexpectedError } = require('../../middlewares/custom-exception');

const { Likes, Posts } = require('../../models');
const PostsRepository = require('../repositories/posts.repository');
class LikesService {
  constructor() {
    this.likesRepository = new LikesRepository(Likes, Posts);
    this.postsRepository = new PostsRepository(Posts);
  }
  likePost = async (postId, userId) => {
    const postExist = await this.postsRepository.postExist(postId);
    const isLiked = await this.likesRepository.isLiked(postId, userId);
    if (!postExist) throw new UnexpectedError('없는 게시글입니다.', 404);
    if (!isLiked) await this.likesRepository.unLike(postId, userId);
    this.likesRepository.likePost(postId, userId);
  };
}

module.exports = LikesService;
