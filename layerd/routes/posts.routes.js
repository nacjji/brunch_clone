const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller');
const postController = new PostsController();
const upload = require('../../middlewares/s3PostMiddleware');
const auth = require('../../middlewares/auth');

router.post('/', auth, upload.single('image'), postController.createPost);
router.get('/', postController.findAllPosts);
router.get('/:postId', postController.findDetailPost);
router.put('/:postId', upload.single('image'), postController.updatePost);
router.delete('/:postId', postController.deletePost);
router.get('/restore/:postId', postController.restorePost);
module.exports = router;
