const PickupLocation = require('../models/pickupLocationModel');

// GET all pickups
const getAllPickups = async (req, res) => {
  try {
    const pickups = await PickupLocation.find().sort({ date: 1 });
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Pending Pickups
const getPendingPickups = async (req, res) => {
  try {
    // Find pickups where the status is 'pending'
    const pending = await PickupLocation.find({ status: 'pending' }).sort({ date: -1 });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single pickup by ID
const getPickupById = async (req, res) => {
  try {
    const pickup = await PickupLocation.findById(req.params.id);
    if (!pickup) return res.status(404).json({ message: 'Pickup not found' });
    res.json(pickup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new pickup
const createPickup = async (req, res) => {
  try {
    const {
      name,
      latitude,
      longitude,
      description,
      date,
      time,
      wasteType,
      reported_by
    } = req.body;

    const pickup = new PickupLocation({
      name,
      latitude,
      longitude,
      description,
      date,
      time,
      wasteType,
      reported_by
    });

    await pickup.save();
    res.status(201).json(pickup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// UPDATE a pickup
const updatePickup = async (req, res) => {
    try {
      const { id } = req.params;
      const updateFields = req.body;
  
      // Optional: validate status field
      if (updateFields.status && !['pending', 'accepted', 'declined'].includes(updateFields.status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      const updatedPickup = await PickupLocation.findByIdAndUpdate(
        id,
        updateFields,
        { new: true } // return the updated document
      );
  
      if (!updatedPickup) {
        return res.status(404).json({ message: 'Pickup not found' });
      }
  
      res.status(200).json({
        message: 'Pickup updated successfully',
        data: updatedPickup
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

// DELETE a pickup
const deletePickup = async (req, res) => {
  try {
    const deletedPickup = await PickupLocation.findByIdAndDelete(req.params.id);
    if (!deletedPickup) return res.status(404).json({ message: 'Pickup not found' });
    res.json({ message: 'Pickup deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPickups,
  getPickupById,
  createPickup,
  updatePickup,
  deletePickup,
  getPendingPickups
};
