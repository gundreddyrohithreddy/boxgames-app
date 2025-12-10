const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", (req, res) => {
  res.clearCookie("boxgames_token");
  return res.json({ message: "Logged out" });
});

module.exports = router;
