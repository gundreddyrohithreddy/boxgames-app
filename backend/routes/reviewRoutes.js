// backend/routes/reviewRoutes.js
const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const reviewController = require('../controllers/reviewController');

// Player creates review
router.post('/venue/:venueId', auth, role(['PLAYER']), reviewController.createReview);

// Get reviews for a venue (public)
router.get('/venue/:venueId', reviewController.getReviewsForVenue);

module.exports = router;
