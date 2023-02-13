const FollowRepository = require('../../layered/repositories/follows.repository');
const { Follows } = require('../../models');
class FollowService {
  constructor() {
    this.followRepository = new FollowRepository(Follows);
  }

  followUser = async (userId, interestUser) => {
    return await this.followRepository.followUser(userId, interestUser);
  };
}

module.exports = FollowService;
