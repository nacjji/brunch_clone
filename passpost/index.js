const passport = require('passport');
const kakao = require('./kakaoStrategy');
const Users = require('../models/users');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  kakao();
};
