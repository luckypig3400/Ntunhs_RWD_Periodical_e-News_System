const express = require('express');
const router = express.Router();

const CATEGORY = require('../models/category/categoryQuery');

router.route('/').get(async (req, res) => {
    try {
        const results = await CATEGORY.getCategroy();
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router
    .route('/:categoryID')
    .get(async (req, res) => {
        try {
            const { categoryID } = req.params;
            const result = await CATEGORY.getCategroy(categoryID);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    })
    .put(async (req, res) => {
        try {
            const { categoryID } = req.params;
            const { value } = req.body;
            const results = await CATEGORY.updateCategroy({ categoryID, value });
            return res.status(200).json({ categoryID });
        } catch (error) {
            return res.status(500).json({ error });
        }
    });

module.exports = router;
