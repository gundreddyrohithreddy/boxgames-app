const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const { createBooking } = require("../controllers/booking.controller");

router.post("/", auth, createBooking);

module.exports = router;
