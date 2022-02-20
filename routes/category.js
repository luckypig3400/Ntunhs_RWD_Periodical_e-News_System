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
            const result = await CATEGORY.get(categoryID);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    })
    .put(async (req, res) => {
        try {
            const { categoryID } = req.params;
            const { value } = req.body;
            const result = await CATEGORY.update({ categoryID, value });
            if (result) return res.status(200).json({ message: result.message || 'inserted successfully' });
        } catch (error) {
            return res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            const { categoryID } = req.params;
            const result = await CATEGORY.delete({ categoryID });
            return res.status(200).json({ message: 'delete successfully' });
        } catch (error) {
            return res.status(500).json({ error });
        }
    });

module.exports = router;
