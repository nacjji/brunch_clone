const express = require('express');
const router = express.Router();
const UserInfoController = require('../controllers/writerInfo.controller.js');
const userInfoController = new UserInfoController();
const auth = require('../../middlewares/auth');

router.get('/', auth.isLoggedIn, userInfoController.writerInfo);
module.exports = router;
