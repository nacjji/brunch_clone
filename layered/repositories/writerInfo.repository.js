class UserInfoRepository {
  constructor(usersModel, followModel) {
    this.usersModel = usersModel;
    this.followModel = followModel;
  }

  writerInfo = async (userId) => {
    return await this.usersModel.findOne({
      where: { userId },
      raw: true,
      attributes: { exclude: ['password', 'accessToken'] },
    });
  };
}

module.exports = UserInfoRepository;
