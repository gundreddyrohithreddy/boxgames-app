// backend/controllers/reviewController.js
const prisma = require('../prisma');

exports.createReview = async (req, res, next) => {
  try {
    const { venueId } = req.params;
    const { rating, comment } = req.body;
    const playerId = req.user.id;

    const ratingNum = Number(rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ message: 'rating must be 1–5' });
    }

    // Ensure venue exists
    const venue = await prisma.venue.findUnique({ where: { id: Number(venueId) } });
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    const review = await prisma.$transaction(async (tx) => {
      // Create review
      const created = await tx.review.create({
        data: {
          rating: ratingNum,
          comment,
          playerId,
          venueId: Number(venueId),
        },
      });

      // Recompute aggregate
      const agg = await tx.review.aggregate({
        where: { venueId: Number(venueId) },
        _avg: { rating: true },
        _count: { rating: true },
      });

      await tx.venue.update({
        where: { id: Number(venueId) },
        data: {
          ratingAverage: agg._avg.rating || 0,
          ratingCount: agg._count.rating,
        },
      });

      return created;
    });

    res.status(201).json({ review });
  } catch (err) {
    next(err);
  }
};

exports.getReviewsForVenue = async (req, res, next) => {
  try {
    const { venueId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { venueId: Number(venueId) },
      orderBy: { createdAt: 'desc' },
      include: {
        player: {
          select: { id: true, name: true },
        },
      },
    });

    res.json({ reviews });
  } catch (err) {
    next(err);
  }
};
