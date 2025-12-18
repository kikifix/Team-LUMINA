#!/usr/bin/env node

const mongoose = require('mongoose');
const { seedDatabase } = require('../data/seedData');
require('dotenv').config();

const runSeed = async () => {
  try {
    console.log('🚀 Connecting to MongoDB...');
    
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/travelguide';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    await seedDatabase();
    
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  runSeed();
}

module.exports = runSeed;