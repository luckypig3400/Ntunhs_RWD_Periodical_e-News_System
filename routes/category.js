const express = require('express');
const router = express.Router();

const CATEGORY = require('../models/category/categoryQuery');

router.route('/').get(async (req, res) => {
    try {
        const results = await CATEGORY.getCategroy();
        return res.status(200).json({ results });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.route('/:categoryID').get(async (req, res) => {
    try {
        const { categoryID } = req.params;
        const results = await CATEGORY.getCategroy(categoryID);
        return res.status(200).json({ results });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

module.exports = router;
