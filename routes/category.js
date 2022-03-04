const express = require("express");
const router = express.Router();

const CATEGORY = require("../models/category/categoryQuery");

router.route("/").get(async (req, res) => {
  try {
    const results = await CATEGORY.get();
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router
  .route("/:categoryID")
  .get(async (req, res) => {
    try {
      const { categoryID } = req.params;
      const result = await CATEGORY.get(categoryID);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const { categoryID } = req.params;
      const { value } = req.body;
      const result = await CATEGORY.update({ categoryID, value });
      return res.status(201).json({ message: `${result} successfully` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { categoryID } = req.params;
      await CATEGORY.delete({ categoryID });
      return res.status(200).json({ message: "Delete successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
