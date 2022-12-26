const express = require('express');
const router = express.Router();
const UserInfoController = require('../controllers/userInfo.controller');
const userInfoController = new UserInfoController();
const auth = require('../../middlewares/auth');

router.get('/', auth.isLoggedIn, userInfoController.userInfo);
module.exports = router;
