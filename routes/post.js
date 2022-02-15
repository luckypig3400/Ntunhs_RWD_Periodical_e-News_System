const express = require('express');
const router = express.Router();

const POST = require('../models/post/postQuery');

router
    .route('/')
    .get(async (req, res) => {
        try {
            const { page = 1, sort_by = 'id', order_by = 'DESC' } = req.query;
            const { results, totalCount } = await POST.getPosts({
                page,
                sort_by,
                order_by,
            });

            return res.status(200).json({ totalCount, results });
        } catch (error) {
            return res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const { periodNumber, noYear, noMonth, categoryID, subject, writer, content } = req.body;
            if (!periodNumber || !noYear || !noMonth || !categoryID || !subject || !writer || !content)
                return res.status(400).json({ message: 'Required field is missing' });
            await POST.createPost({
                periodNumber,
                noYear,
                noMonth,
                categoryID,
                subject,
                writer,
                content,
            });
            return res.status(200).json({
                periodNumber,
                noYear,
                noMonth,
                categoryID,
                subject,
                writer,
                content,
            });
        } catch (error) {
            return res.status(500).json({ error });
        }
    });

router.route('/:postID').get(async (req, res) => {
    try {
        const { postID } = req.params;
        const result = await POST.getPostByID({ postID });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
