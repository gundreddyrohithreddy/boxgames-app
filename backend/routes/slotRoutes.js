const router = require('express').Router();
const slotController = require('../controllers/slotController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.get('/venue/:venueId', slotController.getSlotsByVenueAndDate);
router.post('/court/:courtId/bulk', auth, role(['PROVIDER']), slotController.createSlotsBulk);

module.exports = router;
