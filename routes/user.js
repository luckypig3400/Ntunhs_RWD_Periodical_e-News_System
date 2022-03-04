const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const USER = require("../models/user/userQuery");

router.route("/").get(async (req, res) => {
  try {
    const result = await USER.get();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router
  .route("/:userID")
  .get(async (req, res) => {
    try {
      const { userID } = req.params;
      const result = await USER.getByID({ userID });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const { userID } = req.params;
      let { username, name, password } = req.body;
      if (!username && !name && !password) return res.status(400).json({ message: "Required field is missing" });
      if (password) password = await bcrypt.hash(password, 10);

      const data = Object.fromEntries(Object.entries({ username, name, password }).filter(([key, value]) => value));

      await USER.update({ userID, data });
      return res.status(200).json({ message: "Update successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { userID } = req.params;
      await USER.delete({ userID });
      return res.status(200).json({ message: "Delete successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
