const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destinations: [{
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination'
    },
    startDate: Date,
    endDate: Date,
    experiences: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experience'
    }]
  }],
  totalDuration: Number, // in days
  estimatedBudget: {
    amount: Number,
    currency: String
  },
  status: {
    type: String,
    enum: ['planning', 'booked', 'completed'],
    default: 'planning'
  },
  notes: String,
  isPublic: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trip', tripSchema);