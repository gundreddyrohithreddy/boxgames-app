// backend/controllers/slotController.js
const prisma = require('../prisma');
const { addMinutes, parseISO, startOfDay, endOfDay } = require('date-fns');

exports.getSlotsByVenueAndDate = async (req, res, next) => {
  try {
    const venueId = Number(req.params.venueId);
    const { date } = req.query; // expected format: 'YYYY-MM-DD'

    if (!date) {
      return res.status(400).json({ message: 'date (YYYY-MM-DD) is required' });
    }

    const dayStart = new Date(`${date}T00:00:00.000Z`);
    const dayEnd = new Date(`${date}T23:59:59.999Z`);

    // Get courts for this venue
    const courts = await prisma.court.findMany({
      where: { venueId },
      select: { id: true, name: true, sportType: true, pricePerHour: true },
    });

    const courtIds = courts.map(c => c.id);

    const slots = await prisma.slot.findMany({
      where: {
        courtId: { in: courtIds },
        startTime: { gte: dayStart, lte: dayEnd },
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    // Group slots by court
    const result = courts.map(court => ({
      court,
      slots: slots.filter(s => s.courtId === court.id),
    }));

    res.json({ venueId, date, courts: result });
  } catch (err) {
    next(err);
  }
};

// Bulk slot creation: simple hourly slots
// body: { date: 'YYYY-MM-DD', startTime: 'HH:mm', endTime: 'HH:mm' }
exports.createSlotsBulk = async (req, res, next) => {
  try {
    const courtId = Number(req.params.courtId);
    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: 'date, startTime, endTime are required' });
    }

    // Validate that court belongs to this provider
    const court = await prisma.court.findUnique({
      where: { id: courtId },
      include: { venue: true },
    });

    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }

    if (court.venue.providerId !== req.user.id) {
      return res.status(403).json({ message: 'Not your court' });
    }

    const start = new Date(`${date}T${startTime}:00.000Z`); // e.g., '2025-01-01T06:00:00.000Z'
    const end = new Date(`${date}T${endTime}:00.000Z`);

    if (start >= end) {
      return res.status(400).json({ message: 'startTime must be before endTime' });
    }

    const durationMinutes = 60; // 1-hour slots for MVP
    const toCreate = [];
    let current = start;

    while (addMinutes(current, durationMinutes) <= end) {
      const slotStart = current;
      const slotEnd = addMinutes(current, durationMinutes);

      toCreate.push({
        courtId,
        date: start, // same day
        startTime: slotStart,
        endTime: slotEnd,
        status: 'AVAILABLE',
      });

      current = slotEnd;
    }

    const createdSlots = await prisma.$transaction(
      toCreate.map(data => prisma.slot.create({ data }))
    );

    res.status(201).json({ count: createdSlots.length, slots: createdSlots });
  } catch (err) {
    next(err);
  }
};
