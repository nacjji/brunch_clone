const LikesService = require('../../layerd/services/likes.service');

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
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      return res.status(error.status).json({ message: error.message });
    }
  };
  likedPost = async (req, res) => {
    try {
      const likedPost = await this.likesService.likedPost();
      return res.status(200).json({ result: likedPost });
    } catch (error) {
      logger.error(
        `status code :, ${error.status}, error message : ${error.massage}`,
      );
      return res.status(error.status).json({ message: error.message });
    }
  };
}

module.exports = LikesController;
