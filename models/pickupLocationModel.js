const mongoose = require('mongoose');

const pickupLocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  wasteType: { type: String, required: true },
  reported_by: { type: String, required: true }, // This can be a user ID, email, or name
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending' 
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('PickupLocation', pickupLocationSchema);