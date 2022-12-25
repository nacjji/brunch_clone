const express = require('express');
const router = express.Router();

//TODO: router 미들웨어 작성
const postRouter = require('./posts.routes');
router.use('/post/', postRouter);

const commentsRouter = require('./comments.routes');
router.use('/comment', commentsRouter);

const likeRouter = require('./like.route');
router.use('/like/', likeRouter);

module.exports = router;
