const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../../middlewares/auth');

router.get('/kakao', passport.authenticate('kakao-login'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao-login', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    res.redirect('/');
  },
);

module.exports = router;
