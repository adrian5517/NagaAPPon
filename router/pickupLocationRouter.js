const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickupLocationController');

// Read all pickups
router.get('/', pickupController.getAllPickups);

// Get Pending Pickups 
router.get('/pending', pickupController.getPendingPickups);

// Read single pickup
router.get('/:id', pickupController.getPickupById);

// Create new pickup
router.post('/', pickupController.createPickup);

// Update existing pickup
router.put('/:id', pickupController.updatePickup);

// Delete a pickup
router.delete('/:id', pickupController.deletePickup);

module.exports = router;
