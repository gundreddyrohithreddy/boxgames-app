const router = require('express').Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.get('/overview', auth, role(['ADMIN']), adminController.getOverview);

module.exports = router;
