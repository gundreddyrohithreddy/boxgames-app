const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const { createVenue, listVenues, getVenue } = require("../controllers/venue.controller");

// public
router.get("/", listVenues);
router.get("/:id", getVenue);

// protected
router.post("/", auth, createVenue);

module.exports = router;
