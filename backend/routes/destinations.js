const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// Get all destinations with filtering and search
router.get('/', async (req, res) => {
  try {
    const { category, priceRange, search, limit = 20 } = req.query;
    
    let query = {};
    
    if (category) query.category = category;
    if (priceRange) query.priceRange = priceRange;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const destinations = await Destination.find(query)
      .limit(parseInt(limit))
      .sort({ rating: -1, createdAt: -1 });
    
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single destination
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new destination (for demo purposes)
router.post('/', async (req, res) => {
  try {
    const destination = new Destination(req.body);
    const savedDestination = await destination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;