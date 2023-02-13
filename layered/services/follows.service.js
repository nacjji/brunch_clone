const FollowRepository = require('../../layered/repositories/follows.repository');
const { Follows } = require('../../models');
class FollowService {
  constructor() {
    this.followRepository = new FollowRepository(Follows);
  }

  followUser = async (userId, interestUser) => {
    const existUser = await this.followRepository.existUser(userId);
    if (!existUser) throw new UnexpectedError('존재하지 않는 사용자', 400);
    if (userId === interestUser)
      throw new UnexpectedError('나를 팔로우할 수 없습니다.', 400);

    const isFollowed = await this.followRepository.isFollowed(userId);
    if (isFollowed.length) {
      await this.followRepository.unFollowUser(userId, interestUser);
    }
    return await this.followRepository.followUser(userId, interestUser);
  };
}

module.exports = FollowService;
