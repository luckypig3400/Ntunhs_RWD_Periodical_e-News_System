const express = require('express');
const router = express.Router();

const POST = require('../models/post/postQuery');

router.route('/').get(async (req, res) => {
    try {
        const { content, writer, category_id, subject, page = 1, order_by = 'DESC', sort_by = 'id', limit = 10 } = req.query;
        if (!content && !writer && !category_id && !subject) throw 'Required field is missing';
        const { results, totalCount } = await POST.getByQuery({
            content,
            writer,
            category_id,
            subject,
            page,
            order_by,
            sort_by,
            limit,
        });
        return res.status(200).json({ totalCount, results });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
