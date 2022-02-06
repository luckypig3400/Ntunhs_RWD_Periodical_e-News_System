const express = require('express');
const router = express.Router();

const POST = require('../models/post/postQuery');

router
    .route('/')
    .get(async (req, res) => {
        try {
            const { page = 1, sort_by = 'id', order_by = 'DESC' } = req.query;
            const results = await POST.getPosts({ page, sort_by, order_by });
            return res.status(200).json({ page, results });
        } catch (e) {
            return res.status(500).json({ error: e });
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
            return res.status(200).json({ periodNumber, noYear, noMonth, categoryID, subject, writer, content });
        } catch (e) {
            return res.status(500).json({ error: e });
        }
    });

module.exports = router;
