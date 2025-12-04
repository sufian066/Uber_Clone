// backend/routes/rideRoutes.js
const router = require('express').Router();
const {
  createRide,
  listRides,
  listPendingRides,
  acceptRide,
  completeRide,
} = require('../controllers/rideController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createRide);
router.get('/', auth, listRides);
router.get('/pending', auth, listPendingRides);

router.post('/:id/accept', auth, acceptRide);
router.post('/:id/complete', auth, completeRide);

module.exports = router;


