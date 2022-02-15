const express = require('express');
const router = express.Router();

const POST = require('../models/post/postQuery');

router.route('/').get(async (req, res) => {
    try {
        const { content, writer, category_id, subject, page = 1 } = req.query;
        if (!content && !writer && !category_id && !subject)
            return res.status(404).json({ message: 'Required field is missing' });
        const { results, totalCount } = await POST.getPostByQuery({ content, writer, category_id, subject, page });
        return res.status(200).json({ totalCount, results });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
