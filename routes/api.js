const express = require('express');
const router = express.Router();

const { verifyToken } = require('./auth');

const postRouter = require('./post');
const categoryRouter = require('./category');
const searchRouter = require('./search');
const uploadRouter = require('./upload');

router.use(verifyToken);

router.use('/post', postRouter);
router.use('/category', categoryRouter);
router.use('/search', searchRouter);
router.use('/upload', uploadRouter);

module.exports = router;
