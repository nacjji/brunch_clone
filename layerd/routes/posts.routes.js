const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller');
const postController = new PostsController();
const upload = require('../../middlewares/s3PostMiddleware');

router.post('/', upload.single('image'), postController.createPost);
router.get('/', postController.findAllPosts);
router.get('/:postId', postController.findDetailPost);
router.put('/:postId', upload.single('image'), postController.updatePost);
module.exports = router;
