require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = [{ id: '1', username: 'admin', password: '1234', name: 'admin' }];

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ').pop() : null;
    if (token) {
        jwt.verify(token, process.env.JWTSECRECTKEY, (err, tokenData) => {
            if (err) {
                res.status(403).json({ message: 'Invalid token' });
            } else {
                req.tokenData = tokenData;
                next();
            }
        });
    } else {
        res.status(403).json({ message: 'Invalid token' });
    }
};

router.route('/login').post((req, res) => {
    const { username, password, name } = req.body;
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
        const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRECT_KEY, {
            expiresIn: 60 * 60 * 24,
        });

        res.cookie('accessTokens', accessToken, {
            maxAge: 60 * 60 * 24,
            secure: false, //set true if using https
            httpOnly: true,
        })
            .status(200)
            .json({ message: 'login successful', user, token: accessToken });
    } else {
        res.status(400).json({ message: 'login failed' });
    }
});

router.route('/register').post((req, res) => {
    const { username, password, name } = req.body;
    res.json({ message: 'register response', username, password, name });
});

module.exports = { router, verifyToken };
