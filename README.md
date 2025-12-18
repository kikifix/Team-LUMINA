# Wanderlust - Travel Guide Website

A modern, clean, and intuitive travel guide website built with the MERN stack. Discover destinations, plan trips, and explore local experiences effortlessly.

## ✨ Features

- **Destination Discovery**: Browse curated destinations with detailed information
- **Trip Planning**: Create and manage personalized trip itineraries
- **Local Experiences**: Discover authentic activities and experiences
- **Interactive Search**: Find destinations by name, location, or category
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern Animations**: Smooth transitions and engaging interactions

## 🚀 Tech Stack

- **Frontend**: React 18, React Router, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Styling**: CSS3 with modern design patterns
- **State Management**: React Hooks
- **API**: RESTful API design

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wanderlust-travel-guide
   ```

2. **Install all dependencies**
   ```bash
   npm run install-deps
   ```

3. **Set up environment variables**
   ```bash
   # Backend environment (backend/.env)
   MONGODB_URI=mongodb://localhost:27017/travelguide
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the application**
   ```bash
   # Start both frontend and backend concurrently
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🏗️ Project Structure

```
wanderlust-travel-guide/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── package.json
├── package.json         # Root package.json
└── README.md
```

## 🎯 Key Components

### Backend API Endpoints

- `GET /api/destinations` - Get all destinations with filtering
- `GET /api/destinations/:id` - Get single destination
- `GET /api/experiences` - Get experiences by destination
- `GET /api/trips` - Get user trips
- `POST /api/trips` - Create new trip

### Frontend Pages

- **Home**: Hero section with search and featured destinations
- **Destinations**: Browse and filter destinations
- **Destination Detail**: Detailed destination information with experiences
- **Trip Planner**: Create and manage trip itineraries

## 🎨 Design Features

- **Modern Gradient Design**: Beautiful color schemes and gradients
- **Smooth Animations**: Framer Motion for engaging interactions
- **Responsive Layout**: Mobile-first design approach
- **Clean Typography**: Inter font for excellent readability
- **Interactive Elements**: Hover effects and smooth transitions

## 🔧 Development Scripts

```bash
# Install all dependencies
npm run install-deps

# Start development servers
npm run dev

# Start backend only
npm run server

# Start frontend only
npm run client

# Build for production
npm run build
```

## 🌟 Demo Data

The application includes mock data for demonstration:
- Featured destinations (Santorini, Tokyo, Machu Picchu, etc.)
- Sample experiences and activities
- Example trip itineraries

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred database
2. Configure environment variables
3. Deploy to Heroku, Railway, or your preferred platform

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Netlify, Vercel, or your preferred platform
3. Update API endpoints to point to your backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🎉 Getting Started Tips

1. **Explore the Home Page**: Check out the hero section and featured destinations
2. **Browse Destinations**: Use the search and filter functionality
3. **View Details**: Click on any destination to see detailed information
4. **Plan a Trip**: Use the trip planner to create your itinerary
5. **Responsive Design**: Try the app on different screen sizes

## 🔮 Future Enhancements

- User authentication and profiles
- Real-time booking integration
- Social features and reviews
- Interactive maps
- Mobile app version
- AI-powered recommendations

---

Built with ❤️ by Team LUMINA. Happy traveling! 🌍
Team members-
DIPIKA
SUDIKSHA
KOYEL
