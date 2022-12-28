const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/s3PostMiddleware');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.put(
  '/update',
  auth.isLoggedIn,
  upload.single('image'),
  usersController.updateUser,
);

module.exports = router;
