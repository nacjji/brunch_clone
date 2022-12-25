const LikesService = require('../../layerd/services/likes.service');

class LikesController {
  likesService = new LikesService();
  likePost = async (req, res) => {
    const userId = 1;
    const { postId } = req.params;
    const likey = await this.likesService.likePost(
      parseInt(postId),
      parseInt(userId),
    );
    console.log(likey);

    return res.status(201).json({ message: likey.message });
  };
  likedPost = async (req, res) => {
    const likedPost = await this.likesService.likedPost();
    return res.status(200).json({ result: likedPost });
  };
}

module.exports = LikesController;
