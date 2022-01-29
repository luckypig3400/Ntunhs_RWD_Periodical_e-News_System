const express = require('express');
const router = express.Router();
const { router: authRouter } = require('./auth');

router.use('/auth', authRouter);

module.exports = router;
