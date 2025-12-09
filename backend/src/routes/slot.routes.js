const express = require("express");
const router = express.Router();
const { getSlotsForCourt } = require("../controllers/slot.controller");

router.get("/courts/:id/slots", getSlotsForCourt);

module.exports = router;
