const express = require('express')
const router = express.Router()

const ANNOUNCEMENT = require('../models/announcement/announcementQuery')

router
    .route('/')
    .get(async (req, res) => {
        try {
            const results = await ANNOUNCEMENT.get()
            return res.status(200).json({ results })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })
    .post(async (req, res) => {
        try {
            const { text,dateTime } = req.body
            const result = await ANNOUNCEMENT.create({ text,dateTime })
            return res.status(201).json({ id: result.insertId, text,dateTime })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })

router
    .route('/:announcementID')
    .get(async (req, res) => {
        try {
            const { announcementID } = req.params
            const result = await ANNOUNCEMENT.get(announcementID)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const { announcementID } = req.params
            await ANNOUNCEMENT.delete({ announcementID })
            return res.status(200).json({ message: 'Delete successfully' })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })

module.exports = router
