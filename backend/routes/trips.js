const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/auth');

// Get user trips
router.get('/', authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id })
      .populate('destinations.destination')
      .populate('destinations.experiences')
      .sort({ updatedAt: -1 });
    
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single trip
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id })
      .populate('destinations.destination')
      .populate('destinations.experiences');
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new trip
router.post('/', authMiddleware, async (req, res) => {
  try {
    const trip = new Trip({
      ...req.body,
      user: req.user._id
    });
    const savedTrip = await trip.save();
    const populatedTrip = await Trip.findById(savedTrip._id)
      .populate('destinations.destination')
      .populate('destinations.experiences');
    res.status(201).json(populatedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update trip
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    )
    .populate('destinations.destination')
    .populate('destinations.experiences');
    
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add destination to trip
router.post('/:id/destinations', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.destinations.push(req.body);
    trip.updatedAt = Date.now();
    
    const savedTrip = await trip.save();
    const populatedTrip = await Trip.findById(savedTrip._id)
      .populate('destinations.destination')
      .populate('destinations.experiences');
    
    res.json(populatedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete trip
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove destination from trip
router.delete('/:id/destinations/:destinationIndex', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const destinationIndex = parseInt(req.params.destinationIndex);
    if (destinationIndex < 0 || destinationIndex >= trip.destinations.length) {
      return res.status(400).json({ message: 'Invalid destination index' });
    }

    trip.destinations.splice(destinationIndex, 1);
    trip.updatedAt = Date.now();
    
    const savedTrip = await trip.save();
    const populatedTrip = await Trip.findById(savedTrip._id)
      .populate('destinations.destination')
      .populate('destinations.experiences');
    
    res.json(populatedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add experience to destination in trip
router.post('/:id/destinations/:destinationIndex/experiences', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const destinationIndex = parseInt(req.params.destinationIndex);
    if (destinationIndex < 0 || destinationIndex >= trip.destinations.length) {
      return res.status(400).json({ message: 'Invalid destination index' });
    }

    trip.destinations[destinationIndex].experiences.push(req.body.experienceId);
    trip.updatedAt = Date.now();
    
    const savedTrip = await trip.save();
    const populatedTrip = await Trip.findById(savedTrip._id)
      .populate('destinations.destination')
      .populate('destinations.experiences');
    
    res.json(populatedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove experience from destination in trip
router.delete('/:id/destinations/:destinationIndex/experiences/:experienceIndex', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const destinationIndex = parseInt(req.params.destinationIndex);
    const experienceIndex = parseInt(req.params.experienceIndex);
    
    if (destinationIndex < 0 || destinationIndex >= trip.destinations.length) {
      return res.status(400).json({ message: 'Invalid destination index' });
    }

    if (experienceIndex < 0 || experienceIndex >= trip.destinations[destinationIndex].experiences.length) {
      return res.status(400).json({ message: 'Invalid experience index' });
    }

    trip.destinations[destinationIndex].experiences.splice(experienceIndex, 1);
    trip.updatedAt = Date.now();
    
    const savedTrip = await trip.save();
    const populatedTrip = await Trip.findById(savedTrip._id)
      .populate('destinations.destination')
      .populate('destinations.experiences');
    
    res.json(populatedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;