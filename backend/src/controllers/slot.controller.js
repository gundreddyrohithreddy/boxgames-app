const prisma = require("../prisma");
const { startOfDay, endOfDay } = require("date-fns");

// List slots for a court and date
exports.getSlotsForCourt = async (req, res) => {
  try {
    const courtId = Number(req.params.id);
    const { date } = req.query; // "2025-12-09"

    const dateObj = new Date(date);
    const slots = await prisma.timeSlot.findMany({
      where: {
        courtId,
        date: {
          gte: startOfDay(dateObj),
          lte: endOfDay(dateObj),
        },
      },
      orderBy: { startTime: "asc" },
    });

    res.json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
