const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();
const auth = require('../../middlewares/auth');

router.post('/register', auth.isNotLoggedIn, usersController.register);
router.post('/login', auth.isNotLoggedIn, usersController.login);
router.get('/writer-info', auth.isLoggedIn, usersController.mypage);

module.exports = router;
