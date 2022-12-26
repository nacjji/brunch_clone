const UserInfoRepository = require('../repositories/writerInfo.repository');
const FollowRepository = require('../repositories/follows.repository');

const { Users, Follows } = require('../../models');
class UserInfoService {
  constructor() {
    this.userInfoRepository = new UserInfoRepository(Users);
    this.followRepository = new FollowRepository(Follows);
  }

  writerInfo = async (userId) => {
    const writerInfo = await this.userInfoRepository.writerInfo(userId);

    return writerInfo;
  };
}

module.exports = UserInfoService;
