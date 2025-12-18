import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ArrowRight, Compass, Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [popularExperiences, setPopularExperiences] = useState([]);

  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1 });
  const [destinationsRef, destinationsInView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    fetchFeaturedDestinations();
    fetchPopularExperiences();
  }, []);

  const fetchFeaturedDestinations = async () => {
    try {
      const response = await axios.get('/api/destinations?limit=6');
      setFeaturedDestinations(response.data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      // Mock data for demo
      setFeaturedDestinations([
        {
          _id: '1',
          name: 'Santorini',
          country: 'Greece',
          city: 'Oia',
          description: 'Stunning sunsets and white-washed buildings',
          images: [{ url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80' }],
          rating: 4.8,
          category: 'relaxation'
        },
        {
          _id: '2',
          name: 'Tokyo',
          country: 'Japan',
          city: 'Tokyo',
          description: 'Modern metropolis meets ancient traditions',
          images: [{ url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2088&q=80' }],
          rating: 4.9,
          category: 'urban'
        },
        {
          _id: '3',
          name: 'Machu Picchu',
          country: 'Peru',
          city: 'Cusco',
          description: 'Ancient Incan citadel in the clouds',
          images: [{ url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80' }],
          rating: 4.7,
          category: 'adventure'
        }
      ]);
    }
  };

  const fetchPopularExperiences = async () => {
    try {
      const response = await axios.get('/api/experiences?popular=true&limit=4');
      setPopularExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      // Mock data for demo
      setPopularExperiences([
        {
          _id: '1',
          title: 'Sunset Wine Tasting',
          type: 'activity',
          description: 'Experience breathtaking sunsets while tasting local wines',
          images: [{ url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' }],
          rating: 4.8,
          pricing: { amount: 85, currency: 'USD' }
        },
        {
          _id: '2',
          title: 'Street Food Tour',
          type: 'restaurant',
          description: 'Discover authentic local flavors with expert guides',
          images: [{ url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2087&q=80' }],
          rating: 4.9,
          pricing: { amount: 45, currency: 'USD' }
        }
      ]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/destinations?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const features = [
    {
      icon: Compass,
      title: 'Discover Destinations',
      description: 'Explore curated destinations with insider tips and local insights'
    },
    {
      icon: Calendar,
      title: 'Plan Your Trip',
      description: 'Create detailed itineraries with our intelligent trip planning tools'
    },
    {
      icon: Users,
      title: 'Local Experiences',
      description: 'Connect with authentic experiences recommended by locals'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: heroInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: heroInView ? 0 : 50, opacity: heroInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1>Discover Your Next Adventure</h1>
            <p>
              Find amazing destinations, plan perfect trips, and discover local experiences 
              that will create memories to last a lifetime.
            </p>
            
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <Search size={20} />
                Search
              </button>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        className="section"
        initial={{ opacity: 0 }}
        animate={{ opacity: featuresInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">Why Choose Wanderlust?</h2>
          <p className="section-subtitle">
            We make travel planning effortless with curated destinations and local insights
          </p>
          
          <div className="grid grid-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: featuresInView ? 0 : 50, opacity: featuresInView ? 1 : 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ padding: '2rem', textAlign: 'center' }}
              >
                <feature.icon size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Destinations */}
      <motion.section 
        ref={destinationsRef}
        className="section"
        style={{ background: '#f8f9fa' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: destinationsInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2 className="section-title">Featured Destinations</h2>
          <p className="section-subtitle">
            Handpicked destinations that offer unforgettable experiences
          </p>
          
          <div className="grid grid-3">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={destination._id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: destinationsInView ? 0 : 50, opacity: destinationsInView ? 1 : 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/destinations/${destination._id}`} className="destination-card card">
                  <img 
                    src={destination.images?.[0]?.url || 'https://via.placeholder.com/400x300'} 
                    alt={destination.name}
                  />
                  <div className="destination-overlay">
                    <h3>{destination.name}</h3>
                    <p>{destination.city}, {destination.country}</p>
                    <div className="rating">
                      <Star size={16} fill="currentColor" />
                      <span>{destination.rating}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/destinations" className="btn btn-primary">
              View All Destinations
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Popular Experiences */}
      {popularExperiences.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">Popular Experiences</h2>
            <p className="section-subtitle">
              Unique activities and experiences loved by travelers
            </p>
            
            <div className="grid grid-2">
              {popularExperiences.map((experience) => (
                <div key={experience._id} className="experience-card card">
                  <img 
                    src={experience.images?.[0]?.url || 'https://via.placeholder.com/400x200'} 
                    alt={experience.title}
                  />
                  <h3>{experience.title}</h3>
                  <p>{experience.description}</p>
                  <div className="experience-meta">
                    <div className="rating">
                      <Star size={14} fill="currentColor" />
                      <span>{experience.rating}</span>
                    </div>
                    <span>${experience.pricing?.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to Start Your Journey?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Join thousands of travelers who trust Wanderlust for their adventures
          </p>
          <Link to="/trip-planner" className="btn btn-secondary">
            Start Planning Your Trip
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;