// backend/controllers/bookingController.js
const prisma = require('../prisma');

exports.createBooking = async (req, res, next) => {
  try {
    const { slotId } = req.body;
    const playerId = req.user.id;

    if (!slotId) {
      return res.status(400).json({ message: 'slotId is required' });
    }

    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
      include: {
        court: {
          include: {
            venue: true,
          },
        },
      },
    });

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.status !== 'AVAILABLE') {
      return res.status(400).json({ message: 'Slot not available' });
    }

    const pricePerHour = slot.court.pricePerHour || 0;

    const result = await prisma.$transaction(async (tx) => {
      // Create booking
      const booking = await tx.booking.create({
        data: {
          playerId,
          slotId: slot.id,
          status: 'PENDING',
          paymentStatus: 'PENDING',
          totalAmount: pricePerHour,
        },
      });

      // Update slot -> mark BOOKED + link booking
      await tx.slot.update({
        where: { id: slot.id },
        data: {
          status: 'BOOKED',
          bookingId: booking.id,
        },
      });

      return booking;
    });

    res.status(201).json({ booking: result });
  } catch (err) {
    next(err);
  }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { playerId: req.user.id },
      include: {
        slot: {
          include: {
            court: {
              include: {
                venue: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};

exports.getProviderBookings = async (req, res, next) => {
  try {
    const providerId = req.user.id;

    const bookings = await prisma.booking.findMany({
      where: {
        slot: {
          court: {
            venue: {
              providerId,
            },
          },
        },
      },
      include: {
        player: {
          select: { id: true, name: true, email: true, phone: true },
        },
        slot: {
          include: {
            court: {
              include: {
                venue: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};
