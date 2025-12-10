// backend/controllers/venueController.js
const prisma = require('../prisma');

exports.getAllVenues = async (req, res, next) => {
  try {
    const { city, sportType } = req.query;

    const venues = await prisma.venue.findMany({
      where: {
        ...(city ? { city: { contains: city, mode: 'insensitive' } } : {}),
        ...(sportType
          ? {
              courts: {
                some: {
                  sportType: { equals: sportType, mode: 'insensitive' },
                },
              },
            }
          : {}),
      },
      include: {
        courts: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ venues });
  } catch (err) {
    next(err);
  }
};

exports.getVenueById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const venue = await prisma.venue.findUnique({
      where: { id },
      include: {
        courts: true,
      },
    });

    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    res.json({ venue });
  } catch (err) {
    next(err);
  }
};

exports.createVenue = async (req, res, next) => {
  try {
    const { name, description, city, address } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }

    const venue = await prisma.venue.create({
      data: {
        name,
        description,
        city,
        address,
        providerId: req.user.id, // provider creating this venue
      },
    });

    res.status(201).json({ venue });
  } catch (err) {
    next(err);
  }
};

exports.updateVenue = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, description, city, address } = req.body;

    // Ensure venue belongs to this provider
    const existing = await prisma.venue.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    if (existing.providerId !== req.user.id) {
      return res.status(403).json({ message: 'Not your venue' });
    }

    const venue = await prisma.venue.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        description: description ?? existing.description,
        city: city ?? existing.city,
        address: address ?? existing.address,
      },
    });

    res.json({ venue });
  } catch (err) {
    next(err);
  }
};

exports.deleteVenue = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.venue.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    if (existing.providerId !== req.user.id) {
      return res.status(403).json({ message: 'Not your venue' });
    }

    // For now: hard delete. For production: soft delete.
    await prisma.venue.delete({ where: { id } });

    res.json({ message: 'Venue deleted' });
  } catch (err) {
    next(err);
  }
};
