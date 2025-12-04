const router = require('express').Router();
const { acceptRide } = require('../controllers/driverController');
const auth = require('../middlewares/authMiddleware');
router.post('/accept/:id', auth, acceptRide);
module.exports = router;
