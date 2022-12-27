const LikesRepository = require('../../layerd/repositories/likes.repository');
const { Likes, Posts } = require('../../models');
class LikesService {
  constructor() {
    this.likesRepository = new LikesRepository(Likes, Posts);
  }
  likePost = async (postId, userId) => {
    return await this.likesRepository.likePost(postId, userId);
  };
}

module.exports = LikesService;
