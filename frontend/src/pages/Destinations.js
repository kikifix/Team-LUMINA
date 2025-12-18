import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Star, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Destinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'culture', label: 'Culture' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'food', label: 'Food' },
    { value: 'nature', label: 'Nature' },
    { value: 'urban', label: 'Urban' }
  ];

  const priceRanges = [
    { value: '', label: 'All Budgets' },
    { value: 'budget', label: 'Budget' },
    { value: 'mid-range', label: 'Mid-range' },
    { value: 'luxury', label: 'Luxury' }
  ];

  useEffect(() => {
    fetchDestinations();
  }, [searchQuery, selectedCategory, selectedPriceRange]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedPriceRange) params.append('priceRange', selectedPriceRange);
      
      const response = await axios.get(`/api/destinations?${params}`);
      setDestinations(response.data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      // Mock data for demo
      setDestinations([
        {
          _id: '1',
          name: 'Santorini',
          country: 'Greece',
          city: 'Oia',
          description: 'Famous for its stunning sunsets, white-washed buildings, and crystal-clear waters. A perfect romantic getaway.',
          images: [{ url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80' }],
          rating: 4.8,
          category: 'relaxation',
          priceRange: 'luxury',
          highlights: ['Sunset views', 'Wine tasting', 'Beach clubs']
        },
        {
          _id: '2',
          name: 'Tokyo',
          country: 'Japan',
          city: 'Tokyo',
          description: 'A vibrant metropolis where ancient traditions blend seamlessly with cutting-edge technology.',
          images: [{ url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2088&q=80' }],
          rating: 4.9,
          category: 'urban',
          priceRange: 'mid-range',
          highlights: ['Sushi restaurants', 'Temples', 'Shopping districts']
        },
        {
          _id: '3',
          name: 'Machu Picchu',
          country: 'Peru',
          city: 'Cusco',
          description: 'Ancient Incan citadel perched high in the Andes Mountains, offering breathtaking views and rich history.',
          images: [{ url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80' }],
          rating: 4.7,
          category: 'adventure',
          priceRange: 'mid-range',
          highlights: ['Hiking trails', 'Ancient ruins', 'Mountain views']
        },
        {
          _id: '4',
          name: 'Bali',
          country: 'Indonesia',
          city: 'Ubud',
          description: 'Tropical paradise known for its lush rice terraces, spiritual temples, and vibrant culture.',
          images: [{ url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' }],
          rating: 4.6,
          category: 'nature',
          priceRange: 'budget',
          highlights: ['Rice terraces', 'Temples', 'Yoga retreats']
        },
        {
          _id: '5',
          name: 'Paris',
          country: 'France',
          city: 'Paris',
          description: 'The City of Light, famous for its art, fashion, gastronomy, and iconic landmarks.',
          images: [{ url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80' }],
          rating: 4.8,
          category: 'culture',
          priceRange: 'luxury',
          highlights: ['Eiffel Tower', 'Louvre Museum', 'Cafés']
        },
        {
          _id: '6',
          name: 'Bangkok',
          country: 'Thailand',
          city: 'Bangkok',
          description: 'A bustling metropolis known for its street food, ornate temples, and vibrant nightlife.',
          images: [{ url: 'https://images.unsplash.com/photo-1563492065-1a83e8c0e8c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80' }],
          rating: 4.5,
          category: 'food',
          priceRange: 'budget',
          highlights: ['Street food', 'Temples', 'Markets']
        }
      ]);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchQuery });
  };

  const getPriceIcon = (priceRange) => {
    switch (priceRange) {
      case 'budget': return '$';
      case 'mid-range': return '$$';
      case 'luxury': return '$$$';
      default: return '$';
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '4rem 0' }}>
        <div className="container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
              Explore Destinations
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
              Discover amazing places around the world
            </p>
            
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search destinations..."
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
      </section>

      {/* Filters */}
      <section style={{ background: 'white', borderBottom: '1px solid #eee', padding: '1rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setShowFilters(!showFilters)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Filter size={18} />
              Filters
            </button>
            
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading destinations...</div>
            </div>
          ) : destinations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>
                No destinations found
              </div>
              <p style={{ color: '#888' }}>Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '2rem', color: '#666' }}>
                Found {destinations.length} destinations
              </div>
              
              <div className="grid grid-3">
                {destinations.map((destination, index) => (
                  <motion.div
                    key={destination._id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/destinations/${destination._id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img 
                        src={destination.images?.[0]?.url || 'https://via.placeholder.com/400x250'} 
                        alt={destination.name}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                            {destination.name}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ffa500' }}>
                            <Star size={16} fill="currentColor" />
                            <span style={{ fontSize: '0.9rem' }}>{destination.rating}</span>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#666' }}>
                          <MapPin size={14} />
                          <span style={{ fontSize: '0.9rem' }}>{destination.city}, {destination.country}</span>
                        </div>
                        
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                          {destination.description}
                        </p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ 
                            background: `rgba(102, 126, 234, 0.1)`, 
                            color: '#667eea', 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '20px', 
                            fontSize: '0.8rem',
                            textTransform: 'capitalize'
                          }}>
                            {destination.category}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#888' }}>
                            <DollarSign size={14} />
                            <span style={{ fontSize: '0.9rem' }}>{getPriceIcon(destination.priceRange)}</span>
                          </div>
                        </div>
                        
                        {destination.highlights && (
                          <div style={{ marginTop: '1rem' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {destination.highlights.slice(0, 3).map((highlight, idx) => (
                                <span 
                                  key={idx}
                                  style={{ 
                                    background: '#f8f9fa', 
                                    color: '#666', 
                                    padding: '0.25rem 0.5rem', 
                                    borderRadius: '12px', 
                                    fontSize: '0.75rem' 
                                  }}
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations;