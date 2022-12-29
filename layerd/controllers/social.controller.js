const KakaoUsersService = require('../services/social.service');
const logger = require('../../config/loggers');

class KakaoUsersController {
  kakaoUsersService = new KakaoUsersService();

  kakaoLogin = async (req, res, next) => {
    try {
      const headers = req.headers['authorizaion'];
      const kakaoToken = headers.split(' ')[1];

      const accessToken = await kakaoUsersService.kakaoLogin(kakaoToken);
      return res.status(200).json({ accessToken: accessToken });
    } catch (error) {
      logger.error(`status code :, ${error.status}, error message : ${error}`);
      return res.status(error.status).json({ error: error.message });
    }
  };
}

module.exports = KakaoUsersController;
