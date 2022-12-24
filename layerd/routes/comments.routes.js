const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.post('/:postId', commentsController.createComment);
router.put('/comment-update/:commentId', commentsController.updateComment);
router.delete('/comment-delete/:commentId', commentsController.deleteComment);

module.exports = router;
