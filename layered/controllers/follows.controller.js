const FollowService = require('../../layered/services/follows.service');
const logger = require('../../config/loggers');

class FollowController {
  followService = new FollowService();

  followUser = async (req, res) => {
    //팔로우 한 사람 1
    const { userId } = res.locals;

    //팔로우 할 사람 2
    const { interestUser } = req.params;
    const following = await this.followService.followUser(userId, interestUser);
    return res.status(201).json({ message: following.message });
    try {
      const { userId } = res.locals;
      const { interestUser } = req.params;
      const following = await this.followService.followUser(
        userId,
        Number(interestUser),
      );
      return res.status(201).json({ message: following.message });
    } catch (error) {
      logger.error(`status code :, ${error.status}, error message : ${error}`);
      return res.status(error.status).json({ error: error.message });
    }
  };
}

module.exports = FollowController;
