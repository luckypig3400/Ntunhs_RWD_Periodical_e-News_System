const express = require("express");
const router = express.Router();

const POST = require("../models/post/postQuery");

router.route("/post").get(async (req, res) => {
  try {
    const { search_query, page = 1 } = req.query;
    const { results, totalCount } = await POST.getPostByQuery({ searchQuery: search_query, page });
    return res.status(200).json({ query: search_query, totalCount, results });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
