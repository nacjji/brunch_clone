const UsersSevice = require('../services/users.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  registerSchema,
  loginSchema,
} = require('../../validations/user.validation');

class UsersController {
  constructor() {
    this.usersService = new UsersSevice(bcrypt, jwt);
  }

  register = async (req, res, next) => {
    try {
      const { email, writer, password } = await registerSchema.validateAsync(
        req.body,
      );
      await this.usersService.register({
        email,
        writer,
        password,
      });
      res.status(201).json({ msg: '회원가입 성공' });
    } catch (err) {
      res.status(err.status).json({ error: err.message });
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = await loginSchema.validateAsync(req.body);
      const accessToken = await this.usersService.login({ email, password });

      res.status(200).json(accessToken);
    } catch (err) {
      res.status(err.status).json({ error: err.message });
      next(err);
    }
  };

  updateUser = async (req, res) => {
    try {
      const { userId } = res.locals;
      const { snsId, email, writer, selfIntro } = req.body;

      if (req.file) {
        const profileImageFile = req.file.location;
        await this.usersService.updateUser(
          userId,
          snsId,
          email,
          writer,
          profileImageFile,
          selfIntro,
        );
      } else {
        await this.usersService.updateUser(
          userId,
          snsId,
          email,
          writer,
          selfIntro,
        );
      }

      return res.status(201).json({ result: '회원 수정 완료' });
    } catch (error) {
      console.log(error);
      return res.status(error.status).json({ error: error.message });
    }
  };
}

module.exports = UsersController;
