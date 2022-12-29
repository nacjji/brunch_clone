const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../../middlewares/auth');
// const KakaoUsersController = require('../controllers/social.controller');
// const kakaoUsersController = new KakaoUsersController();

router.get('/kakao', passport.authenticate('kakao-login'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao-login', {
    failureRedirect: 'https://brunch-clone-codding-fe.vercel.app/',
    session: false,
  }),
  (req, res) => {
    res.redirect('https://brunch-clone-codding-fe.vercel.app/');
  },
);

module.exports = router;
