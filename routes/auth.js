require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const USER = require('../models/user/userQuery');

const users = [{ id: '1', username: 'admin', password: '1234', name: 'admin' }];

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ').pop() : null;
    if (token) {
        jwt.verify(token, process.env.JWTSECRECTKEY, (err, tokenData) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            } else {
                req.tokenData = tokenData;
                next();
            }
        });
    } else {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

router.route('/login').post(async (req, res) => {
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
});

router.route('/register').post(async (req, res) => {
    try {
        let { username, password, name } = req.body;
        if (!name || !username || !password) return res.status(400).json({ message: 'missing required field' });
        password = await bcrypt.hash(password, 10);

        const exist = await USER.register({ name, username, password });
        if (exist) return res.status(400).json({ message: 'username was used' });

        return res.status(200).json({ message: 'register successful', name, username });
    } catch (e) {
        return res.status(500).json({ message: 'something go wrong' });
    }
});

module.exports = { router, verifyToken };
