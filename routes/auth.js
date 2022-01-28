const express = require('express');
const router = express.Router();

router.route('/login').post((req, res) => {
    const { user } = req.body;
    res.json({ message: 'login response', user });
});

router.route('/register').post((req, res) => {
    const { user } = req.body;
    res.json({ message: 'register response', user });
});

module.exports = router;
