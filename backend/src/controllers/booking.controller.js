const prisma = require("../prisma");

exports.createBooking = async (req, res) => {
  try {
    const { courtId, timeSlotId } = req.body;

    // Get slot & court
    const slot = await prisma.timeSlot.findUnique({ where: { id: timeSlotId } });
    if (!slot || slot.courtId !== courtId) {
      return res.status(400).json({ message: "Invalid slot" });
    }
    if (slot.status !== "AVAILABLE") {
      return res.status(400).json({ message: "Slot not available" });
    }

    const court = await prisma.court.findUnique({ where: { id: courtId } });
    if (!court) {
      return res.status(400).json({ message: "Invalid court" });
    }

    // For now simple pricing: basePricePerHour
    const amount = court.basePricePerHour;

    // Transaction:
    const booking = await prisma.$transaction(async (tx) => {
      const updatedSlot = await tx.timeSlot.update({
        where: { id: timeSlotId },
        data: { status: "BOOKED" },
      });

      const booking = await tx.booking.create({
        data: {
          userId: req.user.id,
          courtId,
          timeSlotId,
          amount,
          paymentStatus: "PENDING",
          bookingStatus: "CONFIRMED", // temporary until real payment
        },
      });

      return booking;
    });

    res.json({ message: "Booking created", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
