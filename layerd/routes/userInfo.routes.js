const express = require('express');
const router = express.Router();
const FollowController = require('../controllers/follows.controller');
const followController = new FollowController();

router.post('/:followingUserId', followController.followUser);

module.exports = router;
