const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
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

passport.use(
  new kakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: '/auth/kakao/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);
    },
  ),
);
