const { Op, Sequelize } = require('sequelize');
class UsersRepository {
  constructor(usersModel, followsModel) {
    this.usersModel = usersModel;
    this.followsModel = followsModel;
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
    const getProfileImage = await this.usersModel.findOne({
      where: { userId },
      raw: true,
    });
    getProfileImage.profileImage;

    if (profileImageFile) {
      const updateUser = await this.usersModel.update(
        { snsId, email, writer, profileImage: profileImageFile, selfIntro },
        {
          where: { userId },
          raw: true,
        },
      );
      return updateUser;
    } else {
      const updateUser = await this.usersModel.update(
        {
          snsId,
          email,
          writer,
          profileImage: getProfileImage.profileImage,
          selfIntro,
        },
        {
          where: { userId },
          raw: true,
        },
      );
      return updateUser;
    }
  };

  postwriter = async () => {
    const postWriter = await this.usersModel.findAll({
      raw: true,
    });
    return postWriter;
  };
}
module.exports = UsersRepository;
