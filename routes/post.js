const express = require('express');
const router = express.Router();

const POST = require('../models/post/postQuery');

router
    .route('/')
    .get(async (req, res) => {
        try {
            const { page = 1, sort_by = 'id', order_by = 'DESC', limit = 10 } = req.query;
            const { results, totalCount } = await POST.get({
                page,
                sort_by,
                order_by,
                limit,
            });

            return res.status(200).json({ totalCount, results });
        } catch (error) {
            return res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            const { periodNumber, noYear, noMonth, categoryID, subject, writer, content } = req.body;
            if (!periodNumber || !noYear || !noMonth || !categoryID || !subject || !writer || !content) throw 'Required field is missing';
            await POST.create({
                periodNumber,
                noYear,
                noMonth,
                categoryID,
                subject,
                writer,
                quillcontent: content,
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
        const result = await POST.getByID({ postID });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
