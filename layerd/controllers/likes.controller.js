const LikesService = require('../../layerd/services/likes.service');
const logger = require('../../config/loggers');

class LikesController {
  likesService = new LikesService();
  likePost = async (req, res) => {
    const { userId } = res.locals;
    try {
      const { postId } = req.params;
      const likey = await this.likesService.likePost(
        parseInt(postId),
        parseInt(userId),
      );

      return res.status(201).json({ message: likey.message });
    } catch (error) {
      logger.error(`status code :, ${error.status}, error message : ${error}`);

      return res.status(error.status).json({ message: error.message });
    }
  };
}

module.exports = LikesController;
