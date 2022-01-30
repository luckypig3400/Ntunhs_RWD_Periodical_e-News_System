const express = require('express');
const router = express.Router();
const { router: authRouter } = require('./auth');
const postRouter = require('./post');

router.use('/auth', authRouter);
router.use('/post', postRouter);

module.exports = router;
