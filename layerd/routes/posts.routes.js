const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller');
const postController = new PostsController();
const upload = require('../../middlewares/s3PostMiddleware');
const auth = require('../../middlewares/auth');

router.post(
  '/',
  auth.isLoggedIn,
  upload.single('image'),
  postController.createPost,
);
router.get('/', postController.findAllPosts);
router.get('/my-post', auth.isLoggedIn, postController.myFindDetailPosts);
router.get('/:postId', postController.findDetailPost);
router.put('/:postId', upload.single('image'), postController.updatePost);
router.delete('/:postId', auth.isLoggedIn, postController.deletePost);
router.get('/restore/:postId', auth.isLoggedIn, postController.restorePost);
module.exports = router;
