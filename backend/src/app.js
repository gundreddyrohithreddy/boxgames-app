const express = require("express");
const cors = require("cors");
require("dotenv").config();
const venueRoutes = require('./routes/venueRoutes');
app.use('/api/venues', venueRoutes);

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
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

const cookieParser = require("cookie-parser");
app.use(cookieParser());
