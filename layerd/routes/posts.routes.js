const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller');
const postController = new PostsController();
const upload = require('../../middlewares/s3PostMiddleware');

router.post(
  '/',
  upload.single('image'),

  postController.createPost,
);

module.exports = router;
