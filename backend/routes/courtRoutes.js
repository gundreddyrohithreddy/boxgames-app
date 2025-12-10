const router = require('express').Router();
const courtController = require('../controllers/courtController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.get('/venue/:venueId', courtController.getCourtsByVenue);
router.post('/venue/:venueId', auth, role(['PROVIDER']), courtController.createCourt);
router.put('/:id', auth, role(['PROVIDER']), courtController.updateCourt);
router.delete('/:id', auth, role(['PROVIDER']), courtController.deleteCourt);

module.exports = router;
