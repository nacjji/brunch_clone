const { Users } = require('../../models');
const { UnexpectedError } = require('../../middlewares/custom-exception');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const KakaoUsersRepository = require('../repositories/social.repository');

class KakaoUsersService {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }
  kakaoUsersRepository = new KakaoUsersRepository(Users);

  kakaoLogin = async (kakaoToken) => {
    const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${kakaoToken}` },
    });

    const { data } = result;
    const writer = data._json.properties.nickname;
    const email = data._json.kakao_accout.email;
    const snsId = data.id;
    const profileImage = data.properties.profile_image;

    if (!writer || !email || !snsId)
      throw new UnexpectedError('KEY_ERROR', 400);

    const user = await kakaoUsersRepository.findUserBySnsId(snsId);
    if (!user) {
      await kakaoUsersRepository.createKakaoUser(
        email,
        writer,
        snsId,
        profileImage,
      );
    }
    return jwt.sign({ snsId: user.snsId }, process.env.SECRET_KEY);
  };
}

module.exports = KakaoUsersService;
