class UserInfoRepository {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  userInfo = async (userId) => {
    return await this.usersModel.findOne({
      where: { userId },
      attributes: { exclude: ['password', 'accessToken'] },
    });
  };
}

module.exports = UserInfoRepository;
