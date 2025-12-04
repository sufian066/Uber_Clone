const Ride = require('../models/Ride');

exports.acceptRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  if (ride.status !== 'requested') return res.status(400).json({ error: 'Already accepted' });
  ride.driver = req.user.userId;
  ride.status = 'accepted';
  await ride.save();
  res.json(ride);
};
