const express = require('express');
const router = express.Router();

const { verifyToken } = require('./auth');

router.use(verifyToken);

router.route('/').get((req, res, next) => {
    res.json({ message: 'posts information', tokenData: req.tokenData });
});

module.exports = router;
