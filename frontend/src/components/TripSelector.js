import React, { useState, useEffect } from 'react';
import { Calendar, Plus, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const TripSelector = ({ isOpen, onClose, destination, onAddToTrip }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNewTripForm, setShowNewTripForm] = useState(false);
  const [newTripTitle, setNewTripTitle] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchTrips();
    }
  }, [isOpen]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/trips');
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trips:', error);
      // Mock data for demo
      setTrips([
        {
          _id: '1',
          title: 'European Adventure',
          destinations: [],
          status: 'planning'
        },
        {
          _id: '2',
          title: 'Asian Food Tour',
          destinations: [],
          status: 'planning'
        }
      ]);
    }
    setLoading(false);
  };

  const handleAddToTrip = async (tripId) => {
    try {
      const trip = trips.find(t => t._id === tripId);
      const destinationData = {
        destination: destination,
        startDate: '',
        endDate: '',
        experiences: []
      };

      const updatedTrip = {
        ...trip,
        destinations: [...(trip.destinations || []), destinationData]
      };

      await axios.put(`/api/trips/${tripId}`, updatedTrip);
      onAddToTrip(trip.title);
      onClose();
    } catch (error) {
      console.error('Error adding to trip:', error);
      onAddToTrip('Demo Trip');
      onClose();
    }
  };

  const handleCreateNewTrip = async () => {
    if (!newTripTitle.trim()) return;

    try {
      const newTrip = {
        title: newTripTitle,
        destinations: [{
          destination: destination,
          startDate: '',
          endDate: '',
          experiences: []
        }],
        status: 'planning',
        notes: ''
      };

      await axios.post('/api/trips', newTrip);
      onAddToTrip(newTripTitle);
      onClose();
    } catch (error) {
      console.error('Error creating trip:', error);
      onAddToTrip(newTripTitle);
      onClose();
    }
  };

  const isDestinationInTrip = (trip) => {
    return trip.destinations?.some(dest => 
      dest.destination._id === destination._id || dest.destination === destination._id
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
          maxWidth: '500px',
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
            Add to Trip
          </h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Destination Info */}
        <div style={{ padding: '1rem 2rem', background: '#f8f9fa', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={destination?.images?.[0]?.url || 'https://via.placeholder.com/60x60'}
              alt={destination?.name}
              style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>
                {destination?.name}
              </h4>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                {destination?.city}, {destination?.country}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#666' }}>
              Loading trips...
            </div>
          ) : (
            <>
              {/* Existing Trips */}
              {trips.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Add to Existing Trip
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {trips.map((trip) => {
                      const isAlreadyAdded = isDestinationInTrip(trip);
                      return (
                        <div
                          key={trip._id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            background: isAlreadyAdded ? '#f0f8f0' : 'white'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Calendar size={16} style={{ color: '#667eea' }} />
                            <div>
                              <div style={{ fontWeight: '500' }}>{trip.title}</div>
                              <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'capitalize' }}>
                                {trip.status} • {trip.destinations?.length || 0} destinations
                              </div>
                            </div>
                          </div>
                          {isAlreadyAdded ? (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.5rem',
                              color: '#28a745',
                              fontSize: '0.9rem'
                            }}>
                              <Check size={16} />
                              Added
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddToTrip(trip._id)}
                              className="btn btn-primary"
                              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                            >
                              <Plus size={14} />
                              Add
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Create New Trip */}
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Create New Trip
                </h4>
                {showNewTripForm ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                      type="text"
                      placeholder="Enter trip title..."
                      value={newTripTitle}
                      onChange={(e) => setNewTripTitle(e.target.value)}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                      autoFocus
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={handleCreateNewTrip}
                        className="btn btn-primary"
                        disabled={!newTripTitle.trim()}
                        style={{ flex: 1 }}
                      >
                        Create & Add
                      </button>
                      <button
                        onClick={() => {
                          setShowNewTripForm(false);
                          setNewTripTitle('');
                        }}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNewTripForm(true)}
                    className="btn btn-secondary"
                    style={{ width: '100%' }}
                  >
                    <Plus size={16} />
                    Create New Trip
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TripSelector;