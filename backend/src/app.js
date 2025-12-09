const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

const authRoutes = require("./routes/auth.routes");
const venueRoutes = require("./routes/venue.routes");
const bookingRoutes = require("./routes/booking.routes");
const slotRoutes = require("./routes/slot.routes");

app.use("/auth", authRoutes);
app.use("/venues", venueRoutes);
app.use("/bookings", bookingRoutes);
app.use("/", slotRoutes); // /courts/:id/slots

module.exports = app;
