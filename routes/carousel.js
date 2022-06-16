const express = require("express");
const router = express.Router();

const CAROUSEL = require("../models/carousel/carouselQuery");

router.route("/").get(async (req, res) => {
    try {
        const results = await CAROUSEL.get();
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router
    .route("/:id")
    .get(async (req, res) => {
        try {
            const { id } = req.params;
            const result = await CAROUSEL.get(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    })
    .put(async (req, res) => {
        try {
            const { id } = req.params;
            const { postIDArray } = req.body;
            const result = await CAROUSEL.update({ id, postIDArray });
            return res.status(201).json({ message: `${result} successfully` });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    })
    .delete(async (req, res) => {
        try {
            const { id } = req.params;
            await CAROUSEL.delete({ id });
            return res.status(200).json({ message: "Delete successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

module.exports = router;
