const express = require('express');
const router = express.Router();
const FollowController = require('../controllers/follows.controller');
const followController = new FollowController();
const auth = require('../../middlewares/auth');

router.post('/:followingUserId', auth.isLoggedIn, followController.followUser);
module.exports = router;
