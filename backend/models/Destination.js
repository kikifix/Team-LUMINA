const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    url: String,
    alt: String
  }],
  coordinates: {
    lat: Number,
    lng: Number
  },
  category: {
    type: String,
    enum: ['adventure', 'culture', 'relaxation', 'food', 'nature', 'urban'],
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  priceRange: {
    type: String,
    enum: ['budget', 'mid-range', 'luxury'],
    required: true
  },
  bestTimeToVisit: {
    months: [String],
    weather: String
  },
  highlights: [String],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Destination', destinationSchema);