const prisma = require("../prisma");

// Owner creates venue
exports.createVenue = async (req, res) => {
  try {
    const { name, description, city, address, latitude, longitude, sports } = req.body;

    if (req.user.role !== "OWNER" && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Only owners/admin can create venues" });
    }

    const venue = await prisma.venue.create({
      data: {
        name,
        description,
        city,
        address,
        latitude,
        longitude,
        sports: Array.isArray(sports) ? sports.join(",") : sports,
        ownerId: req.user.id,
      },
    });

    res.json({ message: "Venue created", venue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Public list venues
exports.listVenues = async (req, res) => {
  try {
    const venues = await prisma.venue.findMany({
      include: { courts: true },
    });

    res.json(venues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Public venue details
exports.getVenue = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const venue = await prisma.venue.findUnique({
      where: { id },
      include: { courts: true },
    });

    if (!venue) return res.status(404).json({ message: "Venue not found" });

    res.json(venue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
