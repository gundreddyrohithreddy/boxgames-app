const router = require('express').Router();
const venueController = require('../controllers/venueController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// Public
router.get('/', venueController.getAllVenues);
router.get('/:id', venueController.getVenueById);

// Provider
router.post('/', auth, role(['PROVIDER']), venueController.createVenue);
router.put('/:id', auth, role(['PROVIDER']), venueController.updateVenue);
router.delete('/:id', auth, role(['PROVIDER']), venueController.deleteVenue);

module.exports = router;
