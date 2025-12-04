// backend/models/Driver.js

const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User document
  licenceNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  rating: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Driver', DriverSchema);
