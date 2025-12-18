const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Get experiences by destination
router.get('/', async (req, res) => {
  try {
    const { destination, type, popular } = req.query;
    
    let query = {};
    if (destination) query.destination = destination;
    if (type) query.type = type;
    if (popular === 'true') query.isPopular = true;
    
    const experiences = await Experience.find(query)
      .populate('destination', 'name city country')
      .sort({ rating: -1 });
    
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single experience
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
      .populate('destination');
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new experience
router.post('/', async (req, res) => {
  try {
    const experience = new Experience(req.body);
    const savedExperience = await experience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;