const express = require('express');
const router = express.Router();

//TODO: router 미들웨어 작성
const postRouter = require('./posts.routes');
router.use('/post', postRouter);

const userRouter = require('./users.routes');
router.use('/user', userRouter);

const commentsRouter = require('./comments.routes');
router.use('/comment', commentsRouter);

const likeRouter = require('./like.route');
router.use('/like', likeRouter);

const followRouter = require('./userInfo.routes');
router.use('/userInfo', followRouter);

module.exports = router;
