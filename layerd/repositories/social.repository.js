const { Op, Sequelize } = require('sequelize');
class KakaoUsersRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }

  findUserBySnsId = async (snsId) => {
    const userSnsId = await this.usersModel.findOne({ where: snsId });
    return userSnsId;
  };

  createKakaoUser = async (email, writer, snsId, profileImage) => {
    await this.usersModel.create(email, writer, snsId, profileImage);
  };
}

module.exports = KakaoUsersRepository;
