const express = require('express');
const router = express.Router();

const POST = require('../models/post/postQuery');

router.route('/').get(async (req, res) => {
    try {
        const { content, writer, category_id, subject, period_number, page = 1, order_by = 'DESC', sort_by = 'id', limit = 10 } = req.query;
        if (!content && !writer && !category_id && !subject && !period_number) return res.status(400).json({ message: 'Must provide a query' });
        const { results, totalCount } = await POST.getByQuery({
            content,
            writer,
            category_id,
            subject,
            period_number,
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
