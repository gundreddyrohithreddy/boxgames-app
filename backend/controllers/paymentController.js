const crypto = require("crypto");
const prisma = require("../prisma");
const razorpay = require("../utils/razorpay");

// 1) Create Razorpay order
exports.createOrder = async (req, res, next) => {
  try {
    const { bookingId } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        slot: {
          include: {
            court: true,
          },
        },
      },
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const amount = booking.totalAmount * 100; // convert to paise

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${bookingId}`,
    });

    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentOrderId: order.id,
      },
    });

    res.json({ orderId: order.id, amount, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    next(err);
  }
};

// 2) Verify payment signature
exports.verifyPayment = async (req, res, next) => {
  try {
    const { orderId, paymentId, signature, bookingId } = req.body;

    const generated = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generated !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: "PAID",
        paymentId: paymentId,
      },
    });

    await prisma.slot.update({
      where: { id: bookingId },
      data: { status: "BOOKED" },
    });

    res.json({ message: "Payment verified successfully" });
  } catch (err) {
    next(err);
  }
};
