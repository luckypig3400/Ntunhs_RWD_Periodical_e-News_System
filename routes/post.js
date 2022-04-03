const express = require('express')
const router = express.Router()

const POST = require('../models/post/postQuery')

router
    .route('/')
    .get(async (req, res) => {
        try {
            const { page = 1, sort_by = 'id', order_by = 'DESC', limit = 10 } = req.query
            const { results, totalCount } = await POST.get({
                page,
                sort_by,
                order_by,
                limit,
            })

            return res.status(200).json({ totalCount, results })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })
    .post(async (req, res) => {
        try {
            const { periodNumber, noYear, noMonth, categoryID, subject, writer, content, cover = '' } = req.body
            if (!periodNumber || !noYear || !noMonth || !categoryID || !subject || !writer || !content)
                return res.status(400).json({ message: 'Required field is missing' })
            await POST.create({
                periodNumber,
                noYear,
                noMonth,
                categoryID,
                subject,
                writer,
                quillcontent: content,
                cover,
            })
            return res.status(201).json({
                periodNumber,
                noYear,
                noMonth,
                categoryID,
                subject,
                writer,
                content,
            })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })

router
    .route('/:postID')
    .get(async (req, res) => {
        try {
            const { postID } = req.params
            const result = await POST.getByID({ postID })
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })
    .patch(async (req, res) => {
        try {
            const { postID } = req.params
            const { periodNumber, noYear, noMonth, categoryID, subject, writer, content, cover=''} = req.body
            if (!periodNumber && !noYear && !noMonth && !categoryID && !subject && !writer && !content)
                return res.status(400).json({ message: 'Required field is missing' })

            const data = Object.fromEntries(
                Object.entries({ periodNumber, noYear, noMonth, categoryID, subject, writer, quillcontent: content, cover }).filter(
                    ([key, value]) => value
                )
            )
            console.log(data);
            await POST.update({ postID, data })
            return res.status(200).json({ message: 'Update successfully' })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const { postID } = req.params
            await POST.delete({ postID })
            return res.status(200).json({ message: 'Delete successfully' })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })

module.exports = router
