const UserInfoService = require('../services/writerInfo.service');

class UserInfoController {
  userInfoService = new UserInfoService();

  writerInfo = async (req, res) => {
    const { userId } = res.locals;
    try {
      const writerInfo = await this.userInfoService.writerInfo(userId);
      return res.status(200).json({ result: writerInfo });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      return res.status(error.status).json({ message: error.message });
    }
  };
}
module.exports = UserInfoController;
