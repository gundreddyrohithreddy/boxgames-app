const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venueController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public
router.get('/', venueController.getAllVenues);
router.get('/:id', venueController.getVenueById);

// Provider only (will use auth + role check)
router.post('/', authMiddleware, venueController.createVenue);
router.put('/:id', authMiddleware, venueController.updateVenue);
router.delete('/:id', authMiddleware, venueController.deleteVenue);

module.exports = router;
