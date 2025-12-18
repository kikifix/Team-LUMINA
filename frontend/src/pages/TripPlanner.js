import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, Trash2, Edit3, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import DestinationSelector from '../components/DestinationSelector';

const TripPlanner = () => {
  const [trips, setTrips] = useState([]);
  const [showNewTripForm, setShowNewTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [showDestinationSelector, setShowDestinationSelector] = useState(false);
  const [selectedTripForDestination, setSelectedTripForDestination] = useState(null);
  const [newTrip, setNewTrip] = useState({
    title: '',
    destinations: [],
    notes: ''
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
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
          user: 'demo-user',
          destinations: [
            {
              destination: {
                _id: '1',
                name: 'Paris',
                country: 'France',
                city: 'Paris',
                images: [{ url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }]
              },
              startDate: '2024-06-01',
              endDate: '2024-06-05',
              experiences: []
            },
            {
              destination: {
                _id: '2',
                name: 'Rome',
                country: 'Italy',
                city: 'Rome',
                images: [{ url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }]
              },
              startDate: '2024-06-06',
              endDate: '2024-06-10',
              experiences: []
            }
          ],
          totalDuration: 10,
          estimatedBudget: { amount: 2500, currency: 'USD' },
          status: 'planning',
          notes: 'First time in Europe, focusing on art and culture',
          createdAt: '2024-01-15'
        },
        {
          _id: '2',
          title: 'Asian Food Tour',
          user: 'demo-user',
          destinations: [
            {
              destination: {
                _id: '3',
                name: 'Bangkok',
                country: 'Thailand',
                city: 'Bangkok',
                images: [{ url: 'https://images.unsplash.com/photo-1563492065-1a83e8c0e8c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }]
              },
              startDate: '2024-08-15',
              endDate: '2024-08-20',
              experiences: []
            }
          ],
          totalDuration: 5,
          estimatedBudget: { amount: 1200, currency: 'USD' },
          status: 'planning',
          notes: 'Street food adventure and cooking classes',
          createdAt: '2024-02-01'
        }
      ]);
    }
  };

  const createTrip = async () => {
    try {
      const tripData = {
        ...newTrip,
        status: 'planning'
      };
      
      const response = await axios.post('/api/trips', tripData);
      setTrips([response.data, ...trips]);
      setNewTrip({ title: '', destinations: [], notes: '' });
      setShowNewTripForm(false);
    } catch (error) {
      console.error('Error creating trip:', error);
      // For demo, just add to local state
      const mockTrip = {
        _id: Date.now().toString(),
        ...newTrip,
        destinations: [],
        totalDuration: 0,
        estimatedBudget: { amount: 0, currency: 'USD' },
        status: 'planning',
        createdAt: new Date().toISOString()
      };
      setTrips([mockTrip, ...trips]);
      setNewTrip({ title: '', destinations: [], notes: '' });
      setShowNewTripForm(false);
    }
  };

  const deleteTrip = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await axios.delete(`/api/trips/${tripId}`);
        setTrips(trips.filter(trip => trip._id !== tripId));
      } catch (error) {
        console.error('Error deleting trip:', error);
        // For demo, just remove from local state
        setTrips(trips.filter(trip => trip._id !== tripId));
      }
    }
  };

  const updateTrip = async (tripId, updates) => {
    try {
      const response = await axios.put(`/api/trips/${tripId}`, updates);
      setTrips(trips.map(trip => trip._id === tripId ? response.data : trip));
      setEditingTrip(null);
    } catch (error) {
      console.error('Error updating trip:', error);
      // For demo, just update local state
      setTrips(trips.map(trip => 
        trip._id === tripId ? { ...trip, ...updates } : trip
      ));
      setEditingTrip(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planning': return '#667eea';
      case 'booked': return '#ffa500';
      case 'completed': return '#28a745';
      default: return '#666';
    }
  };

  const handleAddDestinationToTrip = (tripId) => {
    setSelectedTripForDestination(tripId);
    setShowDestinationSelector(true);
  };

  const handleDestinationSelected = async (destinationData) => {
    if (!selectedTripForDestination) return;

    try {
      const trip = trips.find(t => t._id === selectedTripForDestination);
      const updatedDestinations = [...(trip.destinations || []), destinationData];
      
      const updatedTrip = {
        ...trip,
        destinations: updatedDestinations
      };

      const response = await axios.put(`/api/trips/${selectedTripForDestination}`, updatedTrip);
      setTrips(trips.map(t => t._id === selectedTripForDestination ? response.data : t));
    } catch (error) {
      console.error('Error adding destination to trip:', error);
      // For demo, update local state
      setTrips(trips.map(trip => 
        trip._id === selectedTripForDestination 
          ? { ...trip, destinations: [...(trip.destinations || []), destinationData] }
          : trip
      ));
    }

    setSelectedTripForDestination(null);
    setShowDestinationSelector(false);
  };

  const removeDestinationFromTrip = async (tripId, destinationIndex) => {
    if (!window.confirm('Remove this destination from the trip?')) return;

    try {
      const trip = trips.find(t => t._id === tripId);
      const updatedDestinations = trip.destinations.filter((_, index) => index !== destinationIndex);
      
      const updatedTrip = {
        ...trip,
        destinations: updatedDestinations
      };

      const response = await axios.put(`/api/trips/${tripId}`, updatedTrip);
      setTrips(trips.map(t => t._id === tripId ? response.data : t));
    } catch (error) {
      console.error('Error removing destination:', error);
      // For demo, update local state
      setTrips(trips.map(trip => 
        trip._id === tripId 
          ? { ...trip, destinations: trip.destinations.filter((_, index) => index !== destinationIndex) }
          : trip
      ));
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8f9fa' }}>
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
              Trip Planner
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
              Plan and organize your perfect adventures
            </p>
            
            <button 
              onClick={() => setShowNewTripForm(true)}
              className="btn btn-secondary"
            >
              <Plus size={18} />
              Create New Trip
            </button>
          </motion.div>
        </div>
      </section>

      {/* New Trip Form Modal */}
      {showNewTripForm && (
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
            style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Create New Trip</h3>
              <button 
                onClick={() => setShowNewTripForm(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
              >
                <X size={24} />
              </button>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Trip Title
              </label>
              <input
                type="text"
                value={newTrip.title}
                onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
                placeholder="e.g., European Adventure"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Notes
              </label>
              <textarea
                value={newTrip.notes}
                onChange={(e) => setNewTrip({ ...newTrip, notes: e.target.value })}
                placeholder="Add any notes about your trip..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowNewTripForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={createTrip}
                className="btn btn-primary"
                disabled={!newTrip.title.trim()}
              >
                Create Trip
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Trips List */}
      <section className="section">
        <div className="container">
          {trips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', padding: '4rem 0' }}
            >
              <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>
                No trips planned yet
              </div>
              <p style={{ color: '#888', marginBottom: '2rem' }}>
                Create your first trip to start planning your adventure
              </p>
              <button 
                onClick={() => setShowNewTripForm(true)}
                className="btn btn-primary"
              >
                <Plus size={18} />
                Create Your First Trip
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-2">
              {trips.map((trip, index) => (
                <motion.div
                  key={trip._id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                  style={{ overflow: 'visible' }}
                >
                  {editingTrip === trip._id ? (
                    <div style={{ padding: '2rem' }}>
                      <input
                        type="text"
                        value={trip.title}
                        onChange={(e) => setTrips(trips.map(t => 
                          t._id === trip._id ? { ...t, title: e.target.value } : t
                        ))}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '1rem'
                        }}
                      />
                      <textarea
                        value={trip.notes || ''}
                        onChange={(e) => setTrips(trips.map(t => 
                          t._id === trip._id ? { ...t, notes: e.target.value } : t
                        ))}
                        placeholder="Add notes..."
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          marginBottom: '1rem',
                          resize: 'vertical'
                        }}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => updateTrip(trip._id, { title: trip.title, notes: trip.notes })}
                          className="btn btn-primary"
                          style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                        >
                          <Save size={14} />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTrip(null)}
                          className="btn btn-secondary"
                          style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Trip Header */}
                      <div style={{ padding: '2rem 2rem 1rem 2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                          <Link 
                            to={`/trips/${trip._id}`}
                            style={{ 
                              textDecoration: 'none', 
                              color: 'inherit',
                              transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#667eea'}
                            onMouseLeave={(e) => e.target.style.color = 'inherit'}
                          >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, cursor: 'pointer' }}>
                              {trip.title}
                            </h3>
                          </Link>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => setEditingTrip(trip._id)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => deleteTrip(trip._id)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                          <span style={{
                            background: getStatusColor(trip.status),
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            textTransform: 'capitalize'
                          }}>
                            {trip.status}
                          </span>
                          {trip.totalDuration > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#666', fontSize: '0.9rem' }}>
                              <Calendar size={14} />
                              {trip.totalDuration} days
                            </div>
                          )}
                          {trip.estimatedBudget?.amount > 0 && (
                            <div style={{ color: '#666', fontSize: '0.9rem' }}>
                              ${trip.estimatedBudget.amount}
                            </div>
                          )}
                        </div>
                        
                        {trip.notes && (
                          <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                            {trip.notes}
                          </p>
                        )}
                      </div>

                      {/* Destinations */}
                      {trip.destinations && trip.destinations.length > 0 ? (
                        <div style={{ padding: '0 2rem 2rem 2rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                              Destinations ({trip.destinations.length})
                            </h4>
                            <button 
                              className="btn btn-primary" 
                              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                              onClick={() => handleAddDestinationToTrip(trip._id)}
                            >
                              <Plus size={14} />
                              Add More
                            </button>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {trip.destinations.map((dest, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', position: 'relative' }}>
                                <img
                                  src={dest.destination.images?.[0]?.url || 'https://via.placeholder.com/60x60'}
                                  alt={dest.destination.name}
                                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                                <div style={{ flex: 1 }}>
                                  <h5 style={{ fontSize: '1rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>
                                    {dest.destination.name}
                                  </h5>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#666', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                    <MapPin size={12} />
                                    {dest.destination.city}, {dest.destination.country}
                                  </div>
                                  {dest.startDate && dest.endDate && (
                                    <div style={{ color: '#888', fontSize: '0.8rem' }}>
                                      {formatDate(dest.startDate)} - {formatDate(dest.endDate)}
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={() => removeDestinationFromTrip(trip._id, idx)}
                                  style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    cursor: 'pointer', 
                                    color: '#dc3545',
                                    padding: '0.5rem'
                                  }}
                                  title="Remove destination"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div style={{ padding: '0 2rem 2rem 2rem', textAlign: 'center', color: '#666' }}>
                          <p style={{ marginBottom: '1rem' }}>No destinations added yet</p>
                          <button 
                            className="btn btn-primary" 
                            style={{ fontSize: '0.9rem' }}
                            onClick={() => handleAddDestinationToTrip(trip._id)}
                          >
                            <Plus size={16} />
                            Add Destination
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Destination Selector Modal */}
      <DestinationSelector
        isOpen={showDestinationSelector}
        onClose={() => {
          setShowDestinationSelector(false);
          setSelectedTripForDestination(null);
        }}
        onSelectDestination={handleDestinationSelected}
        selectedDestinations={
          selectedTripForDestination 
            ? trips.find(t => t._id === selectedTripForDestination)?.destinations || []
            : []
        }
      />
    </div>
  );
};

export default TripPlanner;