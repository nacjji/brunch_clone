const FollowService = require('../../layerd/services/follows.service');

class FollowController {
  followService = new FollowService();

  followUser = async (req, res) => {
    //팔로우 한 사람 1
    // const { userId } = res.locals.user;
    const { userId } = res.locals;

    //팔로우 할 사람 2
    const { followingUserId } = req.params;
    const following = await this.followService.followUser(
      userId,
      followingUserId,
    );
    return res.status(201).json({ message: following.message });
  };
}

module.exports = FollowController;
