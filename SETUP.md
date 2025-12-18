# Quick Setup Guide

## Step-by-Step Instructions

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

Or use the quick command:
```bash
npm run install-deps
```

### 2. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If using local MongoDB
mongod

# Or if using MongoDB as a service
sudo systemctl start mongodb
```

### 3. Seed the Database

Add sample data to your database:

```bash
cd backend
npm run seed
```

You should see output like:
```
🌱 Starting database seeding...
✅ Cleared existing data
✅ Inserted 8 destinations
✅ Inserted 9 experiences
✅ Inserted 3 sample trips
🎉 Database seeding completed successfully!
```

### 4. Start the Application

From the root directory:

```bash
npm run dev
```

This will start:
- Backend API on http://localhost:5000
- Frontend React app on http://localhost:3000

### 5. Access the Application

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

## Alternative: Seed via API

If the backend is already running, you can seed the database via API:

```bash
curl -X POST http://localhost:5000/api/seed
```

## What Data is Included?

### Destinations (8):
- Santorini, Greece 🇬🇷
- Tokyo, Japan 🇯🇵
- Machu Picchu, Peru 🇵🇪
- Bali, Indonesia 🇮🇩
- Paris, France 🇫🇷
- Bangkok, Thailand 🇹🇭
- New York City, USA 🇺🇸
- Iceland 🇮🇸

### Experiences (9):
- Wine tasting, catamaran cruises, sushi classes, street food tours, hiking, yoga, museum tours, and more!

### Sample Trips (3):
- European Romance (Santorini + Paris)
- Asian Adventure (Tokyo + Bangkok)
- Solo Adventure Peru (Machu Picchu)

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running. Start it with `mongod` or `sudo systemctl start mongodb`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill the process using the port or change the PORT in `backend/.env`

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**: Run `npm install` in the backend directory

## Next Steps

1. ✅ Browse destinations at http://localhost:3000/destinations
2. ✅ View destination details by clicking on any destination
3. ✅ Create your own trip at http://localhost:3000/trip-planner
4. ✅ Explore the beautiful UI and smooth animations

Enjoy your travel guide website! 🌍✈️