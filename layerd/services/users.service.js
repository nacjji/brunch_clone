const { Users } = require('../../models');
const UsersRepository = require('../repositories/users.repository');
const { UnexpectedError } = require('../../middlewares/custom-exception');
const PASSWORD_SALT = parseInt(process.env.PASSWORD_SALT);
const { SECRET_KEY } = process.env;

class UsersSevice {
  constructor(bcryptModule, jwtModule) {
    this.bcrypt = bcryptModule;
    this.jwt = jwtModule;
  }
  usersRepository = new UsersRepository(Users);

  register = async ({ email, writer, password }) => {
    const existEmail = await this.usersRepository.findUserByemail({ email });
    if (existEmail) throw new UnexpectedError('ID ALREADY EXISTS', 401);

    const existWriter = await this.usersRepository.findUserByNickname({
      writer,
    });
    if (existWriter) throw new UnexpectedError('NICKNAME ALREADY EXISTS', 401);

    const hashedPW = await this.bcrypt.hash(password, parseInt(PASSWORD_SALT));
    await this.usersRepository.createUser({ email, writer, hashedPW });
  };

  login = async ({ email, password }) => {
    const user = await this.usersRepository.findUserByemail({ email });
    const pwCompare = await this.bcrypt.compare(password, user.password);

    if (!user || !pwCompare) throw new UnexpectedError('WRONG ID/PW', 401);

    const accessToken = this.jwt.sign({ userId: user.userId }, SECRET_KEY, {
      expiresIn: '12h',
    });
    const userId = user.userId;
    const writer = user.writer;

    return { accessToken, userId, writer };
  };

  updateUser = async (
    userId,
    snsId,
    email,
    writer,
    profileImageFile,
    selfIntro,
  ) => {
    console.log(snsId);
    const updateUser = await this.usersRepository.updateUser(
      userId,
      snsId,
      email,
      writer,
      profileImageFile,
      selfIntro,
    );

    return updateUser;
  };
}

module.exports = UsersSevice;
