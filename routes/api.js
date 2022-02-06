const express = require('express');
const router = express.Router();

const { verifyToken } = require('./auth');

const postRouter = require('./post');
const categoryRouter = require('./category');

router.use(verifyToken);

router.use('/post', postRouter);
router.use('/category', categoryRouter);

module.exports = router;
