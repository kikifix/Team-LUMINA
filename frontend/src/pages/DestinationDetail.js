import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Calendar, DollarSign, ArrowLeft, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import TripSelector from '../components/TripSelector';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showTripSelector, setShowTripSelector] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchDestination();
    fetchExperiences();
  }, [id]);

  const fetchDestination = async () => {
    try {
      const response = await axios.get(`/api/destinations/${id}`);
      setDestination(response.data);
    } catch (error) {
      console.error('Error fetching destination:', error);
      // Mock data for demo
      setDestination({
        _id: id,
        name: 'Santorini',
        country: 'Greece',
        city: 'Oia',
        description: 'Santorini is one of the most romantic destinations in the world. Famous for its stunning sunsets, white-washed buildings perched on dramatic cliffs, and crystal-clear waters, this Greek island offers an unforgettable experience.',
        images: [
          { url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80', alt: 'Santorini sunset' },
          { url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', alt: 'Santorini buildings' }
        ],
        rating: 4.8,
        category: 'relaxation',
        priceRange: 'luxury',
        coordinates: { lat: 36.3932, lng: 25.4615 },
        bestTimeToVisit: {
          months: ['April', 'May', 'September', 'October'],
          weather: 'Mild temperatures and fewer crowds'
        },
        highlights: ['Sunset views from Oia', 'Wine tasting tours', 'Beach clubs', 'Traditional villages', 'Volcanic beaches'],
        tags: ['romantic', 'sunset', 'wine', 'beaches', 'photography']
      });
    }
    setLoading(false);
  };

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(`/api/experiences?destination=${id}`);
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      // Mock data for demo
      setExperiences([
        {
          _id: '1',
          title: 'Sunset Wine Tasting in Oia',
          type: 'activity',
          description: 'Experience the world-famous Santorini sunset while tasting exceptional local wines at a traditional winery.',
          images: [{ url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' }],
          rating: 4.9,
          pricing: { amount: 85, currency: 'USD', per: 'person' },
          duration: '3 hours'
        },
        {
          _id: '2',
          title: 'Luxury Catamaran Cruise',
          type: 'activity',
          description: 'Sail around the caldera on a luxury catamaran with swimming stops and gourmet lunch included.',
          images: [{ url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' }],
          rating: 4.7,
          pricing: { amount: 120, currency: 'USD', per: 'person' },
          duration: '5 hours'
        },
        {
          _id: '3',
          title: 'Ammoudi Fish Taverna',
          type: 'restaurant',
          description: 'Authentic Greek seafood restaurant by the water with fresh catch of the day and stunning views.',
          images: [{ url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2087&q=80' }],
          rating: 4.6,
          pricing: { amount: 45, currency: 'USD', per: 'person' },
          duration: '2 hours'
        }
      ]);
    }
  };

  const addToTrip = () => {
    setShowTripSelector(true);
  };

  const handleAddToTrip = (tripTitle) => {
    setSuccessMessage(`Added to "${tripTitle}" successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading destination...</div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Destination not found</h2>
          <Link to="/destinations" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <ArrowLeft size={18} />
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'planning', label: 'Planning Tips' }
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
        <img 
          src={destination.images?.[0]?.url || 'https://via.placeholder.com/1200x600'} 
          alt={destination.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
          display: 'flex',
          alignItems: 'flex-end'
        }}>
          <div className="container" style={{ color: 'white', paddingBottom: '3rem' }}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Link to="/destinations" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <ArrowLeft size={20} />
                Back to Destinations
              </Link>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {destination.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={20} />
                  {destination.city}, {destination.country}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={20} fill="currentColor" />
                  {destination.rating}
                </div>
              </div>
              <button onClick={addToTrip} className="btn btn-primary">
                <Plus size={18} />
                Add to Trip
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section style={{ background: 'white', borderBottom: '1px solid #eee', position: 'sticky', top: '80px', zIndex: 100 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '2rem' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '1rem 0',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: selectedTab === tab.id ? '#667eea' : '#666',
                  borderBottom: selectedTab === tab.id ? '2px solid #667eea' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          {selectedTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-2" style={{ gap: '3rem' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About {destination.name}</h2>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '2rem' }}>
                    {destination.description}
                  </p>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Highlights</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {destination.highlights?.map((highlight, index) => (
                        <span 
                          key={index}
                          style={{ 
                            background: 'rgba(102, 126, 234, 0.1)', 
                            color: '#667eea', 
                            padding: '0.5rem 1rem', 
                            borderRadius: '20px', 
                            fontSize: '0.9rem' 
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Quick Info</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#666' }}>Category:</span>
                        <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>{destination.category}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#666' }}>Budget:</span>
                        <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>{destination.priceRange}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#666' }}>Rating:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Star size={16} fill="#ffa500" color="#ffa500" />
                          <span style={{ fontWeight: '500' }}>{destination.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {destination.bestTimeToVisit && (
                    <div className="card" style={{ padding: '2rem' }}>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={20} />
                        Best Time to Visit
                      </h3>
                      <p style={{ color: '#666', marginBottom: '1rem' }}>
                        {destination.bestTimeToVisit.weather}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {destination.bestTimeToVisit.months?.map((month, index) => (
                          <span 
                            key={index}
                            style={{ 
                              background: '#f8f9fa', 
                              color: '#666', 
                              padding: '0.25rem 0.75rem', 
                              borderRadius: '12px', 
                              fontSize: '0.85rem' 
                            }}
                          >
                            {month}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'experiences' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Things to Do</h2>
              {experiences.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: '#666' }}>
                  No experiences available yet
                </div>
              ) : (
                <div className="grid grid-2">
                  {experiences.map((experience) => (
                    <div key={experience._id} className="card">
                      <img 
                        src={experience.images?.[0]?.url || 'https://via.placeholder.com/400x200'} 
                        alt={experience.title}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                            {experience.title}
                          </h3>
                          <span style={{ 
                            background: `rgba(102, 126, 234, 0.1)`, 
                            color: '#667eea', 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '12px', 
                            fontSize: '0.75rem',
                            textTransform: 'capitalize'
                          }}>
                            {experience.type}
                          </span>
                        </div>
                        
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                          {experience.description}
                        </p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ffa500' }}>
                            <Star size={16} fill="currentColor" />
                            <span style={{ fontSize: '0.9rem' }}>{experience.rating}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#666' }}>
                            <DollarSign size={16} />
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                              ${experience.pricing?.amount} {experience.pricing?.per && `/ ${experience.pricing.per}`}
                            </span>
                          </div>
                        </div>
                        
                        {experience.duration && (
                          <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>
                            Duration: {experience.duration}
                          </div>
                        )}
                        
                        <button className="btn btn-primary" style={{ width: '100%' }}>
                          <Plus size={16} />
                          Add to Trip
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {selectedTab === 'planning' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Planning Your Visit</h2>
              <div className="grid grid-2" style={{ gap: '2rem' }}>
                <div className="card" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Getting There</h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    The nearest airport is Santorini (Thira) National Airport (JTR). 
                    You can also reach Santorini by ferry from Athens (Piraeus port) 
                    or other Greek islands. The ferry journey takes about 5-8 hours 
                    depending on the type of ferry.
                  </p>
                </div>
                
                <div className="card" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Getting Around</h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    Rent a car or ATV for maximum flexibility. Public buses connect 
                    major towns but can be crowded in summer. Taxis are available 
                    but expensive. Many hotels offer shuttle services to popular areas.
                  </p>
                </div>
                
                <div className="card" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Where to Stay</h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    Oia offers the best sunset views but is most expensive. 
                    Fira has more dining and nightlife options. Imerovigli 
                    provides a quieter atmosphere with great views. 
                    Kamari and Perissa have beach access.
                  </p>
                </div>
                
                <div className="card" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Local Tips</h3>
                  <ul style={{ color: '#666', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                    <li>Book sunset dinner reservations well in advance</li>
                    <li>Visit popular spots early morning or late afternoon</li>
                    <li>Try local wines - Santorini has unique volcanic soil</li>
                    <li>Wear comfortable shoes for walking on cobblestones</li>
                    <li>Bring sunscreen and a hat - it gets very sunny</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: '#28a745',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Plus size={18} />
          {successMessage}
        </motion.div>
      )}

      {/* Trip Selector Modal */}
      <TripSelector
        isOpen={showTripSelector}
        onClose={() => setShowTripSelector(false)}
        destination={destination}
        onAddToTrip={handleAddToTrip}
      />
    </div>
  );
};

export default DestinationDetail;