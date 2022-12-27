const { Users, Follows } = require('../../models');
const UsersRepository = require('../repositories/users.repository');
const FollowsRepository = require('../repositories/follows.repository');
const { UnexpectedError } = require('../../middlewares/custom-exception');
const PASSWORD_SALT = parseInt(process.env.PASSWORD_SALT);
const { SECRET_KEY } = process.env;

class UsersSevice {
  constructor(bcryptModule, jwtModule) {
    this.bcrypt = bcryptModule;
    this.jwt = jwtModule;
  }
  usersRepository = new UsersRepository(Users);
  followsRepository = new FollowsRepository(Follows);

  register = async ({ email, writer, password }) => {
    const existEmail = await this.usersRepository.findUserByemail({ email });
    if (existEmail) throw new UnexpectedError('이메일이 이미 존재합니다.', 401);

    const existWriter = await this.usersRepository.findUserByNickname({
      writer,
    });
    if (existWriter)
      throw new UnexpectedError('닉네임이 이미 존재합니다.', 401);

    const hashedPW = await this.bcrypt.hash(password, parseInt(PASSWORD_SALT));
    await this.usersRepository.createUser({ email, writer, hashedPW });
  };

  login = async ({ email, password }) => {
    const user = await this.usersRepository.findUserByemail({ email });
    const pwCompare = await this.bcrypt.compare(password, user.password);

    if (!user || !pwCompare)
      throw new UnexpectedError('잘못된 요청입니다.', 400);

    const accessToken = this.jwt.sign({ userId: user.userId }, SECRET_KEY, {
      expiresIn: '12h',
    });
    const userId = user.userId;
    const writer = user.writer;

    return { accessToken, userId, writer };
  };
}

module.exports = UsersSevice;
