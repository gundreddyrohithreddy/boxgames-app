const router = require('express').Router();
const surveyController = require('../controllers/surveyController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.post('/player', auth, role(['PLAYER']), surveyController.submitPlayerSurvey);
router.post('/provider', auth, role(['PROVIDER']), surveyController.submitProviderSurvey);

router.get('/me', auth, surveyController.getMySurvey);

module.exports = router;
