const { Op, Sequelize } = require('sequelize');
class UsersRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
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
