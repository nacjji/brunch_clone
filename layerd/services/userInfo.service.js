const UserInfoRepository = require('../../layerd/repositories/userInfo.repository');
const { Users } = require('../../models');
class UserInfoService {
  constructor() {
    this.userInfoRepository = new UserInfoRepository(Users);
  }

  userInfo = async (userId) => {
    return await this.userInfoRepository.userInfo(userId);
  };
}

module.exports = UserInfoService;
