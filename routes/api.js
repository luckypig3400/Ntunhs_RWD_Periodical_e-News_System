const express = require("express");
const router = express.Router();

const { verifyToken } = require("./auth");

const postRouter = require("./post");
const categoryRouter = require("./category");
const searchRouter = require("./search");

router.use(verifyToken);

router.use("/post", postRouter);
router.use("/category", categoryRouter);
router.use("/search", searchRouter);

module.exports = router;
