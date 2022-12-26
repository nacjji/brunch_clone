const FollowRepository = require('../../layerd/repositories/follows.repository');
const { Follows } = require('../../models');
class FollowService {
  constructor() {
    this.followRepository = new FollowRepository(Follows);
  }

  followUser = async (userId, followingUserId) => {
    return await this.followRepository.followUser(userId, followingUserId);
  };
}

module.exports = FollowService;
