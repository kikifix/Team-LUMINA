const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['activity', 'restaurant', 'accommodation', 'transport', 'attraction'],
    required: true
  },
  images: [{
    url: String,
    alt: String
  }],
  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  pricing: {
    amount: Number,
    currency: String,
    per: String // per person, per night, etc.
  },
  duration: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  isPopular: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Experience', experienceSchema);