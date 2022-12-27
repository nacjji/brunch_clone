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
}

module.exports = UsersController;
