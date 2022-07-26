const express = require("express");
const router = express.Router();

const INTRODUCTION = require("../models/introduction/introductionQuery");

router.route("/").get(async (req, res) => {
    try {
        const results = await INTRODUCTION.get();
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router
    .route("/:introductionID")
    .get(async (req, res) => {
        try {
            const { introductionID } = req.params;
            const result = await INTRODUCTION.get(introductionID);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    })
    .put(async (req, res) => {
        try {
            const { introductionID } = req.params;
            const { value } = req.body;
            const result = await INTRODUCTION.update({ introductionID, value });
            return res.status(201).json({ message: `${result} successfully` });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

module.exports = router;
