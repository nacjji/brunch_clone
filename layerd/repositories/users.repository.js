const { Op, Sequelize } = require('sequelize');
class UsersRepository {
  constructor(UsersModel, FollowsModel) {
    this.usersModel = UsersModel;
    this.followsModel = FollowsModel;
  }

  createUser = async ({ email, writer, hashedPW }) => {
    await this.usersModel.create({ email, writer, password: hashedPW });
  };

  findUserByemail = async ({ email }) => {
    const userEmail = await this.usersModel.findOne({ where: { email } });
    return userEmail;
  };

  findUserByNickname = async ({ writer }) => {
    const userNickname = await this.usersModel.findOne({ where: { writer } });
    return userNickname;
  };

  findUserByUserId = async ({ userId }) => {
    const userInfo = await this.usersModel.findOne({
      subQuery: false,
      raw: true,
      where: { userId },
      attributes: ['userId', 'writer', 'profileImage'],
    });
    return [userInfo];
  };

  updateUser = async (
    userId,
    snsId,
    email,
    writer,
    profileImageFile,
    selfIntro,
  ) => {
    console.log(userId, 11);
    const updateUser = await this.usersModel.update(
      { snsId, email, writer, profileImage: profileImageFile, selfIntro },
      {
        where: { userId },
        raw: true,
      },
    );
    return updateUser;
  };
}
module.exports = UsersRepository;
