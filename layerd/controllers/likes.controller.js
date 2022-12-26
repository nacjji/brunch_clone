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
      console.log(error);
      return res.status(error.status).json({ message: error.message });
    }
  };
  likedPost = async (req, res) => {
    const likedPost = await this.likesService.likedPost();
    return res.status(200).json({ result: likedPost });
  };
}

module.exports = LikesController;
