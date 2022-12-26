const { Op, Sequelize } = require('sequelize');
class UsersRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }

  createUser = async ({ email, nickname, hashedPW }) => {
    await this.usersModel.create({ email, nickname, password: hashedPW });
  };

  findUserByemail = async ({ email }) => {
    const userEmail = await this.usersModel.findOne({ where: { email } });
    return userEmail;
  };

  findUserByNickname = async ({ nickname }) => {
    const userNickname = await this.usersModel.findOne({ where: { nickname } });
    return userNickname;
  };
}
module.exports = UsersRepository;
