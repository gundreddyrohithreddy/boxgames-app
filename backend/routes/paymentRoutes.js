const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const paymentController = require('../controllers/paymentController');

router.post('/:bookingId/confirm', auth, paymentController.confirmPayment);

module.exports = router;
