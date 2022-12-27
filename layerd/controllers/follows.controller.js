const FollowService = require('../../layerd/services/follows.service');
const logger = require('../../config/loggers');

class FollowController {
  followService = new FollowService();

  followUser = async (req, res) => {
    try {
      const { userId } = res.locals;
      const { interestUser } = req.params;
      const following = await this.followService.followUser(
        userId,
        Number(interestUser),
      );
      return res.status(201).json({ message: following.message });
    } catch (error) {
      console.log(error);
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      return res.status(error.status).json({ error: error.message });
    }
  };
}

module.exports = FollowController;
