const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.post('/', auth, role(['PLAYER']), bookingController.createBooking);
router.get('/me', auth, role(['PLAYER']), bookingController.getMyBookings);
router.get('/provider', auth, role(['PROVIDER']), bookingController.getProviderBookings);

module.exports = router;
