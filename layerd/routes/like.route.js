const express = require('express');
const router = express.Router();
const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();
const auth = require('../../middlewares/auth');

router.put('/:postId', auth.isLoggedIn, likesController.likePost);
router.get('/', likesController.likedPost);
module.exports = router;
