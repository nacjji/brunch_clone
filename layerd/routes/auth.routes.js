const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/kakao', passport.authenticate('kakao'));

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    // 인증 실패시 현재페이지로 Redirect한다
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

module.exports = router;
