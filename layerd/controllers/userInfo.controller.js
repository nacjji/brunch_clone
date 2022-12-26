const UserInfoService = require('../../layerd/services/userInfo.service');

class UserInfoController {
  userInfoService = new UserInfoService();

  userInfo = async (req, res) => {
    const { userId } = res.locals;
    try {
      const userInfo = await this.userInfoService.userInfo(userId);
      return res.status(200).json({ result: userInfo });
    } catch (error) {
      console.log(error);
      return res.status(error.status).json({ message: error.message });
    }
  };
}
module.exports = UserInfoController;
