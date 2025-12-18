const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'https://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/experiences', require('./routes/experiences'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/auth', require('./routes/auth'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelguide', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Travel Guide API is running!' });
});

// Seed database endpoint (for development)
app.post('/api/seed', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ message: 'Seeding not allowed in production' });
  }
  
  try {
    const { seedDatabase } = require('./data/seedData');
    await seedDatabase();
    res.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ message: 'Seeding failed', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});