require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const USER = require('../models/user/userQuery');

const verifyToken = (req, res, next) => {
    const accessToken =
        req.cookies.accessToken ||
        (req.headers['authorization'] ? req.headers['authorization'].split(' ').pop() : null);
    //取得資料跳過驗證
    if (req.method === 'GET') return next();

    if (accessToken) {
        jwt.verify(accessToken, process.env.JWT_SECRECT_KEY, (err, token) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            } else {
                req.token = token;
                return next();
            }
        });
    } else {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

router.route('/login').post(async (req, res) => {
    try {
        const { username, password, name } = req.body;
        let user = await USER.login({ name, username, password });

        if (!user) return res.status(400).json({ message: 'user not found' });

        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRECT_KEY, {
                expiresIn: 60 * 60 * 24,
            });
            delete user.password;
            return res
                .cookie('accessTokens', accessToken, {
                    maxAge: 60 * 60 * 24,
                    secure: false, //set true if using https
                    httpOnly: true, //can't access from javascript
                })
                .status(200)
                .json({ message: 'login successful', user, token: accessToken });
        } else {
            return res.status(400).json({ message: 'password incorrect' });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.route('/register').post(async (req, res) => {
    try {
        let { username, password, name } = req.body;
        if (!name || !username || !password) return res.status(400).json({ message: 'missing required field' });
        password = await bcrypt.hash(password, 10);

        const result = await USER.register({ name, username, password });
        if (!result) return res.status(400).json({ message: 'username was used' });

        return res.status(200).json({ message: 'register successful', name, username });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = { router, verifyToken };
