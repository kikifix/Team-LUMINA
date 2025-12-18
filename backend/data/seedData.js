const mongoose = require('mongoose');
const Destination = require('../models/Destination');
const Experience = require('../models/Experience');
const Trip = require('../models/Trip');
const User = require('../models/User');

const destinations = [
  {
    name: 'Santorini',
    country: 'Greece',
    city: 'Oia',
    description: 'Famous for its stunning sunsets, white-washed buildings perched on dramatic cliffs, and crystal-clear waters. This Greek island paradise offers breathtaking views, world-class wines, and romantic atmosphere that makes it perfect for couples and photography enthusiasts.',
    images: [
      { url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80', alt: 'Santorini sunset view' },
      { url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'White buildings in Oia' }
    ],
    coordinates: { lat: 36.3932, lng: 25.4615 },
    category: 'relaxation',
    rating: 4.8,
    priceRange: 'luxury',
    bestTimeToVisit: {
      months: ['April', 'May', 'September', 'October'],
      weather: 'Mild temperatures, fewer crowds, perfect for sightseeing'
    },
    highlights: ['Sunset views from Oia', 'Wine tasting tours', 'Volcanic beaches', 'Traditional villages', 'Blue dome churches'],
    tags: ['romantic', 'sunset', 'wine', 'beaches', 'photography', 'honeymoon']
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    city: 'Tokyo',
    description: 'A vibrant metropolis where ancient traditions blend seamlessly with cutting-edge technology. Experience world-class cuisine, fascinating culture, efficient transportation, and endless entertainment in this dynamic city that never sleeps.',
    images: [
      { url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2088&q=80', alt: 'Tokyo skyline at night' },
      { url: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80', alt: 'Traditional temple in Tokyo' }
    ],
    coordinates: { lat: 35.6762, lng: 139.6503 },
    category: 'urban',
    rating: 4.9,
    priceRange: 'mid-range',
    bestTimeToVisit: {
      months: ['March', 'April', 'May', 'October', 'November'],
      weather: 'Pleasant temperatures, cherry blossoms in spring'
    },
    highlights: ['Sushi and ramen', 'Ancient temples', 'Shopping districts', 'Cherry blossoms', 'Modern architecture'],
    tags: ['culture', 'food', 'technology', 'temples', 'shopping', 'anime']
  },
  {
    name: 'Machu Picchu',
    country: 'Peru',
    city: 'Cusco',
    description: 'Ancient Incan citadel perched high in the Andes Mountains, offering breathtaking views and rich history. This UNESCO World Heritage site provides an unforgettable journey through time and spectacular mountain scenery.',
    images: [
      { url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80', alt: 'Machu Picchu ruins' },
      { url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Andes mountain view' }
    ],
    coordinates: { lat: -13.1631, lng: -72.5450 },
    category: 'adventure',
    rating: 4.7,
    priceRange: 'mid-range',
    bestTimeToVisit: {
      months: ['May', 'June', 'July', 'August', 'September'],
      weather: 'Dry season, clear skies for best views'
    },
    highlights: ['Inca Trail hiking', 'Ancient ruins', 'Mountain views', 'Llamas and alpacas', 'Sacred Valley'],
    tags: ['hiking', 'history', 'mountains', 'adventure', 'unesco', 'ancient']
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    city: 'Ubud',
    description: 'Tropical paradise known for its lush rice terraces, spiritual temples, vibrant culture, and stunning beaches. Perfect for relaxation, adventure, and spiritual rejuvenation in a beautiful natural setting.',
    images: [
      { url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Bali rice terraces' },
      { url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Traditional Balinese temple' }
    ],
    coordinates: { lat: -8.5069, lng: 115.2625 },
    category: 'nature',
    rating: 4.6,
    priceRange: 'budget',
    bestTimeToVisit: {
      months: ['April', 'May', 'June', 'July', 'August', 'September'],
      weather: 'Dry season, perfect for outdoor activities'
    },
    highlights: ['Rice terraces', 'Hindu temples', 'Yoga retreats', 'Beaches', 'Traditional markets'],
    tags: ['tropical', 'temples', 'yoga', 'beaches', 'culture', 'spiritual']
  },
  {
    name: 'Paris',
    country: 'France',
    city: 'Paris',
    description: 'The City of Light, famous for its art, fashion, gastronomy, and iconic landmarks. Experience world-class museums, charming cafés, beautiful architecture, and romantic atmosphere in this timeless city.',
    images: [
      { url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80', alt: 'Eiffel Tower at sunset' },
      { url: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Louvre Museum' }
    ],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    category: 'culture',
    rating: 4.8,
    priceRange: 'luxury',
    bestTimeToVisit: {
      months: ['April', 'May', 'June', 'September', 'October'],
      weather: 'Pleasant temperatures, perfect for walking'
    },
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées', 'Seine River cruises'],
    tags: ['art', 'museums', 'fashion', 'romance', 'architecture', 'cuisine']
  },
  {
    name: 'Bangkok',
    country: 'Thailand',
    city: 'Bangkok',
    description: 'A bustling metropolis known for its incredible street food, ornate temples, vibrant markets, and exciting nightlife. Experience the perfect blend of traditional Thai culture and modern city life.',
    images: [
      { url: 'https://images.unsplash.com/photo-1563492065-1a83e8c0e8c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80', alt: 'Bangkok temple' },
      { url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Bangkok street food market' }
    ],
    coordinates: { lat: 13.7563, lng: 100.5018 },
    category: 'food',
    rating: 4.5,
    priceRange: 'budget',
    bestTimeToVisit: {
      months: ['November', 'December', 'January', 'February'],
      weather: 'Cool and dry season, most comfortable weather'
    },
    highlights: ['Street food markets', 'Grand Palace', 'Floating markets', 'Temples', 'Rooftop bars'],
    tags: ['street food', 'temples', 'markets', 'nightlife', 'culture', 'budget-friendly']
  },
  {
    name: 'New York City',
    country: 'United States',
    city: 'New York',
    description: 'The city that never sleeps, offering world-class entertainment, diverse neighborhoods, iconic landmarks, and incredible dining. Experience Broadway shows, world-famous museums, and the energy of this global metropolis.',
    images: [
      { url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'New York skyline' },
      { url: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Central Park' }
    ],
    coordinates: { lat: 40.7128, lng: -74.0060 },
    category: 'urban',
    rating: 4.7,
    priceRange: 'luxury',
    bestTimeToVisit: {
      months: ['April', 'May', 'June', 'September', 'October', 'November'],
      weather: 'Pleasant temperatures, great for walking and outdoor activities'
    },
    highlights: ['Statue of Liberty', 'Central Park', 'Broadway shows', 'Times Square', 'Brooklyn Bridge'],
    tags: ['entertainment', 'museums', 'shopping', 'broadway', 'skyline', 'diversity']
  },
  {
    name: 'Iceland',
    country: 'Iceland',
    city: 'Reykjavik',
    description: 'Land of fire and ice, featuring dramatic landscapes, geothermal hot springs, northern lights, and unique Nordic culture. Perfect for adventure seekers and nature lovers looking for otherworldly experiences.',
    images: [
      { url: 'https://images.unsplash.com/photo-1539066834862-2e0c2e2c9b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Northern lights in Iceland' },
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Blue Lagoon geothermal spa' }
    ],
    coordinates: { lat: 64.1466, lng: -21.9426 },
    category: 'nature',
    rating: 4.9,
    priceRange: 'luxury',
    bestTimeToVisit: {
      months: ['June', 'July', 'August', 'September'],
      weather: 'Warmest weather, midnight sun, best for road trips'
    },
    highlights: ['Northern lights', 'Blue Lagoon', 'Geysers', 'Waterfalls', 'Glaciers'],
    tags: ['northern lights', 'geothermal', 'glaciers', 'waterfalls', 'adventure', 'unique']
  },
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    city: 'Dubai',
    description: 'A futuristic city in the desert, known for luxury shopping, ultramodern architecture, and vibrant nightlife. Experience world-class dining, stunning beaches, and record-breaking attractions.',
    images: [
      { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Dubai skyline at night' },
      { url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Burj Khalifa' }
    ],
    coordinates: { lat: 25.2048, lng: 55.2708 },
    category: 'urban',
    rating: 4.6,
    priceRange: 'luxury',
    bestTimeToVisit: {
      months: ['November', 'December', 'January', 'February', 'March'],
      weather: 'Pleasant temperatures, perfect for outdoor activities'
    },
    highlights: ['Burj Khalifa', 'Desert safari', 'Gold souks', 'Luxury malls', 'Beach resorts'],
    tags: ['luxury', 'shopping', 'desert', 'modern', 'beaches', 'nightlife']
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    city: 'Cape Town',
    description: 'Stunning coastal city nestled between mountains and ocean, offering incredible wildlife, wine regions, rich history, and breathtaking landscapes. Perfect blend of adventure and relaxation.',
    images: [
      { url: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Table Mountain Cape Town' },
      { url: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Cape Town waterfront' }
    ],
    coordinates: { lat: -33.9249, lng: 18.4241 },
    category: 'adventure',
    rating: 4.7,
    priceRange: 'mid-range',
    bestTimeToVisit: {
      months: ['October', 'November', 'December', 'January', 'February', 'March'],
      weather: 'Summer season, warm and dry'
    },
    highlights: ['Table Mountain', 'Wine regions', 'Penguin colonies', 'Robben Island', 'Cape Point'],
    tags: ['wildlife', 'wine', 'mountains', 'history', 'penguins', 'safari']
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    city: 'Kyoto',
    description: 'Ancient capital of Japan, home to thousands of temples, traditional gardens, and preserved historic districts. Experience authentic Japanese culture, tea ceremonies, and seasonal beauty.',
    images: [
      { url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Fushimi Inari shrine' },
      { url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Bamboo forest Kyoto' }
    ],
    coordinates: { lat: 35.0116, lng: 135.7681 },
    category: 'culture',
    rating: 4.8,
    priceRange: 'mid-range',
    bestTimeToVisit: {
      months: ['March', 'April', 'May', 'October', 'November'],
      weather: 'Cherry blossoms in spring, autumn colors in fall'
    },
    highlights: ['Fushimi Inari shrine', 'Bamboo forest', 'Golden Pavilion', 'Geisha districts', 'Tea ceremonies'],
    tags: ['temples', 'traditional', 'cherry blossoms', 'geisha', 'zen', 'bamboo']
  },
  {
    name: 'Maldives',
    country: 'Maldives',
    city: 'Malé',
    description: 'Tropical paradise of 1,200 coral islands with crystal-clear waters, pristine beaches, and luxury overwater bungalows. Perfect for honeymoons, diving, and ultimate relaxation.',
    images: [
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Maldives overwater bungalows' },
      { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Maldives crystal clear water' }
    ],
    coordinates: { lat: 3.2028, lng: 73.2207 },
    category: 'relaxation',
    rating: 4.9,
    priceRange: 'luxury',
    bestTimeToVisit: {
      months: ['November', 'December', 'January', 'February', 'March', 'April'],
      weather: 'Dry season, perfect for water activities'
    },
    highlights: ['Overwater villas', 'Coral reefs', 'Diving spots', 'Spa treatments', 'Sunset cruises'],
    tags: ['tropical', 'diving', 'luxury', 'honeymoon', 'beaches', 'coral reefs']
  },
  {
    name: 'Morocco',
    country: 'Morocco',
    city: 'Marrakech',
    description: 'Exotic North African destination with vibrant souks, stunning architecture, Sahara desert adventures, and rich cultural heritage. Experience the magic of ancient medinas and modern luxury.',
    images: [
      { url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Marrakech medina' },
      { url: 'https://images.unsplash.com/photo-1548986537-6ed2b999cd4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Sahara desert Morocco' }
    ],
    coordinates: { lat: 31.6295, lng: -7.9811 },
    category: 'culture',
    rating: 4.5,
    priceRange: 'budget',
    bestTimeToVisit: {
      months: ['October', 'November', 'December', 'January', 'February', 'March'],
      weather: 'Mild temperatures, perfect for exploring'
    },
    highlights: ['Medina souks', 'Sahara desert', 'Atlas Mountains', 'Riads', 'Tagines'],
    tags: ['desert', 'souks', 'culture', 'architecture', 'spices', 'adventure']
  },
  {
    name: 'Norway',
    country: 'Norway',
    city: 'Bergen',
    description: 'Land of fjords, northern lights, and midnight sun. Experience dramatic landscapes, Viking history, and some of the world\'s most spectacular natural phenomena in this Nordic wonderland.',
    images: [
      { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Norwegian fjords' },
      { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Northern lights Norway' }
    ],
    coordinates: { lat: 60.3913, lng: 5.3221 },
    category: 'nature',
    rating: 4.8,
    priceRange: 'luxury',
    bestTimeToVisit: {
      months: ['May', 'June', 'July', 'August', 'September'],
      weather: 'Warmest weather, white nights, best for hiking'
    },
    highlights: ['Geirangerfjord', 'Northern lights', 'Midnight sun', 'Viking museums', 'Scenic railways'],
    tags: ['fjords', 'northern lights', 'hiking', 'vikings', 'nature', 'scenic']
  }
];

const experiences = [
  // Santorini experiences
  {
    title: 'Sunset Wine Tasting in Oia',
    type: 'activity',
    description: 'Experience the world-famous Santorini sunset while tasting exceptional local wines at a traditional winery. Learn about volcanic soil wine production and enjoy panoramic caldera views.',
    images: [{ url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Wine tasting at sunset' }],
    location: {
      address: 'Oia, Santorini, Greece',
      coordinates: { lat: 36.4618, lng: 25.3753 }
    },
    pricing: { amount: 85, currency: 'USD', per: 'person' },
    duration: '3 hours',
    rating: 4.9,
    tags: ['wine', 'sunset', 'romantic', 'photography'],
    isPopular: true
  },
  {
    title: 'Luxury Catamaran Cruise',
    type: 'activity',
    description: 'Sail around the caldera on a luxury catamaran with swimming stops at hot springs, gourmet lunch, and unlimited drinks. Perfect for couples and groups.',
    images: [{ url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Catamaran sailing' }],
    location: {
      address: 'Ammoudi Bay, Santorini, Greece',
      coordinates: { lat: 36.4618, lng: 25.3753 }
    },
    pricing: { amount: 120, currency: 'USD', per: 'person' },
    duration: '5 hours',
    rating: 4.7,
    tags: ['sailing', 'swimming', 'luxury', 'all-inclusive'],
    isPopular: true
  },
  {
    title: 'Ammoudi Fish Taverna',
    type: 'restaurant',
    description: 'Authentic Greek seafood restaurant by the water with fresh catch of the day, traditional recipes, and stunning sunset views. Family-owned for generations.',
    images: [{ url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2087&q=80', alt: 'Greek seafood restaurant' }],
    location: {
      address: 'Ammoudi Bay, Oia, Santorini',
      coordinates: { lat: 36.4618, lng: 25.3753 }
    },
    pricing: { amount: 45, currency: 'USD', per: 'person' },
    duration: '2 hours',
    rating: 4.6,
    tags: ['seafood', 'traditional', 'waterfront', 'family-owned']
  },

  // Tokyo experiences
  {
    title: 'Sushi Making Class with Master Chef',
    type: 'activity',
    description: 'Learn the art of sushi making from a master chef in a traditional setting. Includes market visit, hands-on preparation, and tasting of your creations.',
    images: [{ url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Sushi making class' }],
    location: {
      address: 'Tsukiji, Tokyo, Japan',
      coordinates: { lat: 35.6654, lng: 139.7707 }
    },
    pricing: { amount: 95, currency: 'USD', per: 'person' },
    duration: '4 hours',
    rating: 4.8,
    tags: ['cooking', 'sushi', 'traditional', 'hands-on'],
    isPopular: true
  },
  {
    title: 'Tokyo Street Food Tour',
    type: 'activity',
    description: 'Explore hidden food alleys and local markets with a knowledgeable guide. Taste authentic ramen, yakitori, takoyaki, and other Japanese street food favorites.',
    images: [{ url: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Tokyo street food' }],
    location: {
      address: 'Shibuya & Harajuku, Tokyo, Japan',
      coordinates: { lat: 35.6598, lng: 139.7006 }
    },
    pricing: { amount: 65, currency: 'USD', per: 'person' },
    duration: '3.5 hours',
    rating: 4.7,
    tags: ['street food', 'local culture', 'walking tour', 'authentic']
  },

  // Machu Picchu experiences
  {
    title: 'Classic Inca Trail 4-Day Trek',
    type: 'activity',
    description: 'Follow the ancient Inca Trail through stunning Andean landscapes, cloud forests, and archaeological sites. Includes camping, meals, and professional guides.',
    images: [{ url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Inca Trail hiking' }],
    location: {
      address: 'Inca Trail, Cusco, Peru',
      coordinates: { lat: -13.1631, lng: -72.5450 }
    },
    pricing: { amount: 650, currency: 'USD', per: 'person' },
    duration: '4 days',
    rating: 4.9,
    tags: ['hiking', 'camping', 'adventure', 'history'],
    isPopular: true
  },

  // Bali experiences
  {
    title: 'Sunrise Yoga at Rice Terraces',
    type: 'activity',
    description: 'Start your day with peaceful yoga practice overlooking the famous Jatiluwih rice terraces. Includes healthy breakfast and meditation session.',
    images: [{ url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2020&q=80', alt: 'Yoga at rice terraces' }],
    location: {
      address: 'Jatiluwih, Tabanan, Bali',
      coordinates: { lat: -8.3405, lng: 115.1318 }
    },
    pricing: { amount: 35, currency: 'USD', per: 'person' },
    duration: '3 hours',
    rating: 4.8,
    tags: ['yoga', 'sunrise', 'meditation', 'nature'],
    isPopular: true
  },

  // Paris experiences
  {
    title: 'Private Louvre Museum Tour',
    type: 'activity',
    description: 'Skip the lines and explore the world\'s largest art museum with an expert guide. See the Mona Lisa, Venus de Milo, and other masterpieces.',
    images: [{ url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2020&q=80', alt: 'Louvre Museum interior' }],
    location: {
      address: 'Louvre Museum, Paris, France',
      coordinates: { lat: 48.8606, lng: 2.3376 }
    },
    pricing: { amount: 75, currency: 'USD', per: 'person' },
    duration: '3 hours',
    rating: 4.7,
    tags: ['art', 'museum', 'culture', 'skip-the-line'],
    isPopular: true
  },

  // Bangkok experiences
  {
    title: 'Floating Market Food Tour',
    type: 'activity',
    description: 'Explore traditional floating markets and taste authentic Thai street food from boat vendors. Experience local life and flavors on the water.',
    images: [{ url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Bangkok floating market' }],
    location: {
      address: 'Damnoen Saduak, Bangkok, Thailand',
      coordinates: { lat: 13.5225, lng: 99.9550 }
    },
    pricing: { amount: 40, currency: 'USD', per: 'person' },
    duration: '4 hours',
    rating: 4.6,
    tags: ['floating market', 'street food', 'boat tour', 'authentic'],
    isPopular: true
  },
  {
    title: 'Thai Cooking Class',
    type: 'activity',
    description: 'Learn to cook authentic Thai dishes with a local chef. Visit the market, prepare traditional recipes, and enjoy your creations.',
    images: [{ url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Thai cooking class' }],
    location: {
      address: 'Silom, Bangkok, Thailand',
      coordinates: { lat: 13.7248, lng: 100.5340 }
    },
    pricing: { amount: 55, currency: 'USD', per: 'person' },
    duration: '5 hours',
    rating: 4.7,
    tags: ['cooking', 'market visit', 'authentic', 'hands-on']
  },

  // New York experiences
  {
    title: 'Broadway Show Experience',
    type: 'activity',
    description: 'Watch a world-class Broadway musical in the heart of Times Square. Includes premium seats and backstage tour option.',
    images: [{ url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Broadway theater' }],
    location: {
      address: 'Times Square, New York, NY',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    pricing: { amount: 150, currency: 'USD', per: 'person' },
    duration: '3 hours',
    rating: 4.9,
    tags: ['broadway', 'theater', 'entertainment', 'iconic'],
    isPopular: true
  },
  {
    title: 'Central Park Bike Tour',
    type: 'activity',
    description: 'Explore Central Park on a guided bike tour, visiting famous landmarks, hidden gems, and learning about NYC history.',
    images: [{ url: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Central Park biking' }],
    location: {
      address: 'Central Park, New York, NY',
      coordinates: { lat: 40.7829, lng: -73.9654 }
    },
    pricing: { amount: 45, currency: 'USD', per: 'person' },
    duration: '2.5 hours',
    rating: 4.5,
    tags: ['biking', 'park', 'sightseeing', 'active']
  },

  // Iceland experiences
  {
    title: 'Northern Lights Photography Tour',
    type: 'activity',
    description: 'Hunt for the Aurora Borealis with professional photographers. Includes warm clothing, hot drinks, and photography tips.',
    images: [{ url: 'https://images.unsplash.com/photo-1539066834862-2e0c2e2c9b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Northern lights photography' }],
    location: {
      address: 'Reykjavik, Iceland',
      coordinates: { lat: 64.1466, lng: -21.9426 }
    },
    pricing: { amount: 120, currency: 'USD', per: 'person' },
    duration: '4 hours',
    rating: 4.8,
    tags: ['northern lights', 'photography', 'night tour', 'winter'],
    isPopular: true
  },
  {
    title: 'Blue Lagoon Geothermal Spa',
    type: 'activity',
    description: 'Relax in the famous geothermal spa with milky blue waters rich in minerals. Includes silica mud mask and towel rental.',
    images: [{ url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Blue Lagoon spa' }],
    location: {
      address: 'Grindavik, Iceland',
      coordinates: { lat: 63.8804, lng: -22.4495 }
    },
    pricing: { amount: 85, currency: 'USD', per: 'person' },
    duration: '3 hours',
    rating: 4.6,
    tags: ['geothermal', 'spa', 'relaxation', 'unique'],
    isPopular: true
  },

  // Dubai experiences
  {
    title: 'Desert Safari with BBQ Dinner',
    type: 'activity',
    description: 'Experience dune bashing, camel riding, sandboarding, and traditional entertainment with a delicious BBQ dinner under the stars.',
    images: [{ url: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Dubai desert safari' }],
    location: {
      address: 'Dubai Desert, UAE',
      coordinates: { lat: 25.0657, lng: 55.1713 }
    },
    pricing: { amount: 75, currency: 'USD', per: 'person' },
    duration: '6 hours',
    rating: 4.7,
    tags: ['desert', 'adventure', 'cultural show', 'dinner'],
    isPopular: true
  },
  {
    title: 'Burj Khalifa Sky Deck',
    type: 'attraction',
    description: 'Visit the world\'s tallest building and enjoy panoramic views from the observation deck on the 148th floor.',
    images: [{ url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Burj Khalifa view' }],
    location: {
      address: 'Downtown Dubai, UAE',
      coordinates: { lat: 25.1972, lng: 55.2744 }
    },
    pricing: { amount: 95, currency: 'USD', per: 'person' },
    duration: '2 hours',
    rating: 4.8,
    tags: ['skyscraper', 'views', 'iconic', 'luxury']
  },

  // Cape Town experiences
  {
    title: 'Table Mountain Cable Car & Hike',
    type: 'activity',
    description: 'Take the rotating cable car to the top of Table Mountain for breathtaking 360-degree views of Cape Town and the coast.',
    images: [{ url: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Table Mountain cable car' }],
    location: {
      address: 'Table Mountain, Cape Town, South Africa',
      coordinates: { lat: -33.9628, lng: 18.4098 }
    },
    pricing: { amount: 35, currency: 'USD', per: 'person' },
    duration: '3 hours',
    rating: 4.7,
    tags: ['mountain', 'cable car', 'views', 'hiking'],
    isPopular: true
  },
  {
    title: 'Penguin Colony at Boulders Beach',
    type: 'activity',
    description: 'Visit the famous African penguin colony at Boulders Beach. Walk on boardwalks and observe these charming creatures up close.',
    images: [{ url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'African penguins' }],
    location: {
      address: 'Boulders Beach, Simon\'s Town, South Africa',
      coordinates: { lat: -34.1975, lng: 18.4500 }
    },
    pricing: { amount: 25, currency: 'USD', per: 'person' },
    duration: '2 hours',
    rating: 4.8,
    tags: ['wildlife', 'penguins', 'beach', 'nature']
  },

  // Kyoto experiences
  {
    title: 'Traditional Tea Ceremony',
    type: 'activity',
    description: 'Experience an authentic Japanese tea ceremony in a traditional tea house. Learn about the history and philosophy of this ancient art.',
    images: [{ url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Japanese tea ceremony' }],
    location: {
      address: 'Gion District, Kyoto, Japan',
      coordinates: { lat: 35.0042, lng: 135.7751 }
    },
    pricing: { amount: 65, currency: 'USD', per: 'person' },
    duration: '1.5 hours',
    rating: 4.9,
    tags: ['tea ceremony', 'traditional', 'cultural', 'zen'],
    isPopular: true
  },
  {
    title: 'Bamboo Forest Walk',
    type: 'activity',
    description: 'Stroll through the enchanting Arashiyama Bamboo Grove, one of Japan\'s most photographed natural wonders.',
    images: [{ url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Bamboo forest Kyoto' }],
    location: {
      address: 'Arashiyama, Kyoto, Japan',
      coordinates: { lat: 35.0170, lng: 135.6761 }
    },
    pricing: { amount: 0, currency: 'USD', per: 'person' },
    duration: '1 hour',
    rating: 4.6,
    tags: ['bamboo', 'nature', 'photography', 'free']
  },

  // Maldives experiences
  {
    title: 'Sunset Dolphin Cruise',
    type: 'activity',
    description: 'Sail into the sunset while watching playful dolphins in their natural habitat. Includes refreshments and snorkeling gear.',
    images: [{ url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Dolphin watching Maldives' }],
    location: {
      address: 'Maldives Waters',
      coordinates: { lat: 3.2028, lng: 73.2207 }
    },
    pricing: { amount: 85, currency: 'USD', per: 'person' },
    duration: '3 hours',
    rating: 4.8,
    tags: ['dolphins', 'sunset', 'cruise', 'snorkeling'],
    isPopular: true
  },
  {
    title: 'Overwater Spa Treatment',
    type: 'activity',
    description: 'Indulge in a luxury spa treatment in an overwater pavilion with glass floors offering views of marine life below.',
    images: [{ url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Overwater spa Maldives' }],
    location: {
      address: 'Resort Spa, Maldives',
      coordinates: { lat: 3.2028, lng: 73.2207 }
    },
    pricing: { amount: 200, currency: 'USD', per: 'person' },
    duration: '2 hours',
    rating: 4.9,
    tags: ['spa', 'luxury', 'overwater', 'relaxation']
  },

  // Morocco experiences
  {
    title: 'Sahara Desert Camel Trek',
    type: 'activity',
    description: 'Experience the magic of the Sahara with a camel trek to a desert camp. Includes traditional Berber dinner and overnight camping.',
    images: [{ url: 'https://images.unsplash.com/photo-1548986537-6ed2b999cd4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Sahara camel trek' }],
    location: {
      address: 'Merzouga, Morocco',
      coordinates: { lat: 31.0801, lng: -4.0133 }
    },
    pricing: { amount: 120, currency: 'USD', per: 'person' },
    duration: '2 days',
    rating: 4.7,
    tags: ['desert', 'camels', 'camping', 'adventure'],
    isPopular: true
  },
  {
    title: 'Marrakech Souk Food Tour',
    type: 'activity',
    description: 'Navigate the bustling souks with a local guide, tasting traditional Moroccan street food, spices, and mint tea.',
    images: [{ url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Marrakech souks' }],
    location: {
      address: 'Medina, Marrakech, Morocco',
      coordinates: { lat: 31.6295, lng: -7.9811 }
    },
    pricing: { amount: 45, currency: 'USD', per: 'person' },
    duration: '4 hours',
    rating: 4.6,
    tags: ['souks', 'food tour', 'spices', 'cultural']
  },

  // Norway experiences
  {
    title: 'Geirangerfjord Scenic Cruise',
    type: 'activity',
    description: 'Cruise through the UNESCO World Heritage Geirangerfjord, seeing dramatic waterfalls and steep mountain walls.',
    images: [{ url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Geirangerfjord cruise' }],
    location: {
      address: 'Geiranger, Norway',
      coordinates: { lat: 62.1049, lng: 7.2054 }
    },
    pricing: { amount: 95, currency: 'USD', per: 'person' },
    duration: '2.5 hours',
    rating: 4.9,
    tags: ['fjord', 'cruise', 'waterfalls', 'unesco'],
    isPopular: true
  },
  {
    title: 'Midnight Sun Hiking',
    type: 'activity',
    description: 'Hike under the midnight sun during summer months. Experience the surreal beauty of 24-hour daylight in the Arctic.',
    images: [{ url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Midnight sun hiking Norway' }],
    location: {
      address: 'Lofoten Islands, Norway',
      coordinates: { lat: 68.1102, lng: 13.6929 }
    },
    pricing: { amount: 75, currency: 'USD', per: 'person' },
    duration: '6 hours',
    rating: 4.8,
    tags: ['midnight sun', 'hiking', 'arctic', 'unique']
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await Destination.deleteMany({});
    await Experience.deleteMany({});
    await Trip.deleteMany({});
    await User.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create demo users
    const demoUsers = [
      {
        name: 'Demo User',
        email: 'demo@wanderlust.com',
        password: 'password123'
      },
      {
        name: 'Travel Enthusiast',
        email: 'traveler@wanderlust.com',
        password: 'password123'
      }
    ];

    const insertedUsers = await User.insertMany(demoUsers);
    console.log(`✅ Inserted ${insertedUsers.length} demo users`);

    // Insert destinations
    const insertedDestinations = await Destination.insertMany(destinations);
    console.log(`✅ Inserted ${insertedDestinations.length} destinations`);

    // Link experiences to destinations and insert
    const experiencesWithDestinations = experiences.map((exp, index) => {
      // Map experiences to destinations based on order
      const destinationMapping = {
        0: 0, 1: 0, 2: 0,    // Santorini (first 3 experiences)
        3: 1, 4: 1,          // Tokyo (next 2 experiences)
        5: 2,                // Machu Picchu (1 experience)
        6: 3,                // Bali (1 experience)
        7: 4,                // Paris (1 experience)
        8: 5, 9: 5,          // Bangkok (2 experiences)
        10: 6, 11: 6,        // New York (2 experiences)
        12: 7, 13: 7,        // Iceland (2 experiences)
        14: 8, 15: 8,        // Dubai (2 experiences)
        16: 9, 17: 9,        // Cape Town (2 experiences)
        18: 10, 19: 10,      // Kyoto (2 experiences)
        20: 11, 21: 11,      // Maldives (2 experiences)
        22: 12, 23: 12,      // Morocco (2 experiences)
        24: 13, 25: 13       // Norway (2 experiences)
      };
      
      const destinationIndex = destinationMapping[index] || 0;
      return {
        ...exp,
        destination: insertedDestinations[destinationIndex]._id
      };
    });

    const insertedExperiences = await Experience.insertMany(experiencesWithDestinations);
    console.log(`✅ Inserted ${insertedExperiences.length} experiences`);

    // Create sample trips
    const sampleTrips = [
      {
        title: 'European Romance',
        user: insertedUsers[0]._id,
        destinations: [
          {
            destination: insertedDestinations.find(d => d.name === 'Santorini')._id,
            startDate: new Date('2024-06-01'),
            endDate: new Date('2024-06-05'),
            experiences: [insertedExperiences.find(e => e.title === 'Sunset Wine Tasting in Oia')._id]
          },
          {
            destination: insertedDestinations.find(d => d.name === 'Paris')._id,
            startDate: new Date('2024-06-06'),
            endDate: new Date('2024-06-10'),
            experiences: [insertedExperiences.find(e => e.title === 'Private Louvre Museum Tour')._id]
          }
        ],
        totalDuration: 10,
        estimatedBudget: { amount: 3500, currency: 'USD' },
        status: 'planning',
        notes: 'Honeymoon trip focusing on romance and culture. Book sunset dinner reservations in advance.',
        isPublic: false
      },
      {
        title: 'Asian Food & Culture Tour',
        user: insertedUsers[0]._id,
        destinations: [
          {
            destination: insertedDestinations.find(d => d.name === 'Tokyo')._id,
            startDate: new Date('2024-08-15'),
            endDate: new Date('2024-08-20'),
            experiences: [
              insertedExperiences.find(e => e.title === 'Sushi Making Class with Master Chef')._id,
              insertedExperiences.find(e => e.title === 'Tokyo Street Food Tour')._id
            ]
          },
          {
            destination: insertedDestinations.find(d => d.name === 'Kyoto')._id,
            startDate: new Date('2024-08-21'),
            endDate: new Date('2024-08-24'),
            experiences: [
              insertedExperiences.find(e => e.title === 'Traditional Tea Ceremony')._id,
              insertedExperiences.find(e => e.title === 'Bamboo Forest Walk')._id
            ]
          },
          {
            destination: insertedDestinations.find(d => d.name === 'Bangkok')._id,
            startDate: new Date('2024-08-25'),
            endDate: new Date('2024-08-28'),
            experiences: [
              insertedExperiences.find(e => e.title === 'Floating Market Food Tour')._id,
              insertedExperiences.find(e => e.title === 'Thai Cooking Class')._id
            ]
          }
        ],
        totalDuration: 14,
        estimatedBudget: { amount: 3200, currency: 'USD' },
        status: 'booked',
        notes: 'Comprehensive Asian cultural and culinary journey. Vegetarian options confirmed.',
        isPublic: true
      },
      {
        title: 'Adventure Peru',
        user: insertedUsers[0]._id,
        destinations: [
          {
            destination: insertedDestinations.find(d => d.name === 'Machu Picchu')._id,
            startDate: new Date('2024-09-10'),
            endDate: new Date('2024-09-17'),
            experiences: [insertedExperiences.find(e => e.title === 'Classic Inca Trail 4-Day Trek')._id]
          }
        ],
        totalDuration: 8,
        estimatedBudget: { amount: 1800, currency: 'USD' },
        status: 'planning',
        notes: 'Solo hiking adventure. Inca Trail permits booked for September.',
        isPublic: false
      },
      {
        title: 'Luxury Middle East & Africa',
        user: insertedUsers[1]._id,
        destinations: [
          {
            destination: insertedDestinations.find(d => d.name === 'Dubai')._id,
            startDate: new Date('2024-11-01'),
            endDate: new Date('2024-11-05'),
            experiences: [
              insertedExperiences.find(e => e.title === 'Desert Safari with BBQ Dinner')._id,
              insertedExperiences.find(e => e.title === 'Burj Khalifa Sky Deck')._id
            ]
          },
          {
            destination: insertedDestinations.find(d => d.name === 'Cape Town')._id,
            startDate: new Date('2024-11-06'),
            endDate: new Date('2024-11-12'),
            experiences: [
              insertedExperiences.find(e => e.title === 'Table Mountain Cable Car & Hike')._id,
              insertedExperiences.find(e => e.title === 'Penguin Colony at Boulders Beach')._id
            ]
          }
        ],
        totalDuration: 12,
        estimatedBudget: { amount: 4500, currency: 'USD' },
        status: 'planning',
        notes: 'Luxury trip combining modern Dubai with natural Cape Town. Wine tasting tours added.',
        isPublic: true
      },
      {
        title: 'Nordic Nature Expedition',
        user: insertedUsers[1]._id,
        destinations: [
          {
            destination: insertedDestinations.find(d => d.name === 'Iceland')._id,
            startDate: new Date('2024-12-15'),
            endDate: new Date('2024-12-20'),
            experiences: [
              insertedExperiences.find(e => e.title === 'Northern Lights Photography Tour')._id,
              insertedExperiences.find(e => e.title === 'Blue Lagoon Geothermal Spa')._id
            ]
          },
          {
            destination: insertedDestinations.find(d => d.name === 'Norway')._id,
            startDate: new Date('2024-12-21'),
            endDate: new Date('2024-12-26'),
            experiences: [insertedExperiences.find(e => e.title === 'Geirangerfjord Scenic Cruise')._id]
          }
        ],
        totalDuration: 12,
        estimatedBudget: { amount: 3800, currency: 'USD' },
        status: 'planning',
        notes: 'Winter wonderland trip for northern lights and fjords. Warm clothing packed.',
        isPublic: false
      },
      {
        title: 'Tropical Paradise Getaway',
        user: insertedUsers[0]._id,
        destinations: [
          {
            destination: insertedDestinations.find(d => d.name === 'Maldives')._id,
            startDate: new Date('2025-02-10'),
            endDate: new Date('2025-02-17'),
            experiences: [
              insertedExperiences.find(e => e.title === 'Sunset Dolphin Cruise')._id,
              insertedExperiences.find(e => e.title === 'Overwater Spa Treatment')._id
            ]
          },
          {
            destination: insertedDestinations.find(d => d.name === 'Bali')._id,
            startDate: new Date('2025-02-18'),
            endDate: new Date('2025-02-23'),
            experiences: [insertedExperiences.find(e => e.title === 'Sunrise Yoga at Rice Terraces')._id]
          }
        ],
        totalDuration: 14,
        estimatedBudget: { amount: 5200, currency: 'USD' },
        status: 'planning',
        notes: 'Ultimate relaxation and wellness retreat. Overwater villa booked in Maldives.',
        isPublic: true
      },
      {
        title: 'Cultural Morocco Adventure',
        user: insertedUsers[1]._id,
        destinations: [
          {
            destination: insertedDestinations.find(d => d.name === 'Morocco')._id,
            startDate: new Date('2024-10-05'),
            endDate: new Date('2024-10-12'),
            experiences: [
              insertedExperiences.find(e => e.title === 'Sahara Desert Camel Trek')._id,
              insertedExperiences.find(e => e.title === 'Marrakech Souk Food Tour')._id
            ]
          }
        ],
        totalDuration: 8,
        estimatedBudget: { amount: 1600, currency: 'USD' },
        status: 'completed',
        notes: 'Amazing cultural immersion! Desert camping was unforgettable. Highly recommend.',
        isPublic: true
      }
    ];

    const insertedTrips = await Trip.insertMany(sampleTrips);
    console.log(`✅ Inserted ${insertedTrips.length} sample trips`);

    console.log('🎉 Database seeding completed successfully!');
    console.log(`
📊 Summary:
- ${insertedDestinations.length} destinations
- ${insertedExperiences.length} experiences  
- ${insertedTrips.length} sample trips
    `);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

module.exports = { seedDatabase, destinations, experiences };