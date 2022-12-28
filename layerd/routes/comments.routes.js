const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.post('/:postId', auth.isLoggedIn, commentsController.createComment);
router.put(
  '/comment-update/:commentId',
  auth.isLoggedIn,
  commentsController.updateComment,
);
router.delete(
  '/comment-delete/:commentId',
  auth.isLoggedIn,
  commentsController.deleteComment,
);

module.exports = router;
