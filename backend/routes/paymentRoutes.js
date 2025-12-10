const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const paymentController = require("../controllers/paymentController");

router.post('/:bookingId/confirm', auth, paymentController.confirmPayment);
router.post("/create-order", auth, paymentController.createOrder);
router.post("/verify", auth, paymentController.verifyPayment);

module.exports = router;
