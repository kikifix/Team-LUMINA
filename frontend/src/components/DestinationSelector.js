import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const DestinationSelector = ({ isOpen, onClose, onSelectDestination, selectedDestinations = [] }) => {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchDestinations();
    }
  }, [isOpen, searchQuery]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      
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
          description: 'Famous for stunning sunsets and white buildings',
          images: [{ url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }],
          rating: 4.8,
          category: 'relaxation'
        },
        {
          _id: '2',
          name: 'Tokyo',
          country: 'Japan',
          city: 'Tokyo',
          description: 'Modern metropolis with ancient traditions',
          images: [{ url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }],
          rating: 4.9,
          category: 'urban'
        },
        {
          _id: '3',
          name: 'Bali',
          country: 'Indonesia',
          city: 'Ubud',
          description: 'Tropical paradise with rice terraces',
          images: [{ url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }],
          rating: 4.6,
          category: 'nature'
        }
      ]);
    }
    setLoading(false);
  };

  const handleSelectDestination = (destination) => {
    const destinationData = {
      destination: destination,
      startDate: '',
      endDate: '',
      experiences: []
    };
    onSelectDestination(destinationData);
    onClose();
  };

  const isDestinationSelected = (destinationId) => {
    return selectedDestinations.some(dest => 
      dest.destination._id === destinationId || dest.destination === destinationId
    );
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card"
        style={{ 
          width: '100%', 
          maxWidth: '800px', 
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{ 
          padding: '2rem 2rem 1rem 2rem',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
            Add Destination
          </h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '1rem 2rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            padding: '0.5rem 1rem'
          }}>
            <Search size={20} style={{ color: '#666', marginRight: '0.5rem' }} />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        {/* Destinations List */}
        <div style={{ 
          flex: 1, 
          overflow: 'auto', 
          padding: '0 2rem 2rem 2rem' 
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              Loading destinations...
            </div>
          ) : destinations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              No destinations found
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {destinations.map((destination) => {
                const isSelected = isDestinationSelected(destination._id);
                return (
                  <div
                    key={destination._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: '1px solid #eee',
                      borderRadius: '8px',
                      cursor: isSelected ? 'default' : 'pointer',
                      opacity: isSelected ? 0.6 : 1,
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => !isSelected && handleSelectDestination(destination)}
                  >
                    <img
                      src={destination.images?.[0]?.url || 'https://via.placeholder.com/80x80'}
                      alt={destination.name}
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        objectFit: 'cover', 
                        borderRadius: '8px' 
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: '600', 
                        margin: '0 0 0.25rem 0' 
                      }}>
                        {destination.name}
                      </h4>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.25rem', 
                        color: '#666', 
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem'
                      }}>
                        <MapPin size={14} />
                        {destination.city}, {destination.country}
                      </div>
                      <p style={{ 
                        color: '#666', 
                        fontSize: '0.85rem', 
                        margin: 0,
                        lineHeight: '1.4'
                      }}>
                        {destination.description}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.25rem', 
                        color: '#ffa500' 
                      }}>
                        <Star size={14} fill="currentColor" />
                        <span style={{ fontSize: '0.9rem' }}>{destination.rating}</span>
                      </div>
                      {isSelected ? (
                        <span style={{ 
                          color: '#28a745', 
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}>
                          Already Added
                        </span>
                      ) : (
                        <button
                          className="btn btn-primary"
                          style={{ 
                            fontSize: '0.8rem', 
                            padding: '0.5rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectDestination(destination);
                          }}
                        >
                          <Plus size={14} />
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DestinationSelector;