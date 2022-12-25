const express = require('express');
const router = express.Router();
const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.put('/:postId', likesController.likePost);
router.get('/', likesController.likedPost);
module.exports = router;
