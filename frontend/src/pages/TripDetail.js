import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Star, Plus, Edit3, Save, X, Trash2, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const TripDetail = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingTrip, setEditingTrip] = useState(false);
  const [editedTrip, setEditedTrip] = useState({});
  const [showExperienceSelector, setShowExperienceSelector] = useState(false);
  const [selectedDestinationIndex, setSelectedDestinationIndex] = useState(null);
  const [availableExperiences, setAvailableExperiences] = useState([]);

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/trips/${id}`);
      setTrip(response.data);
      setEditedTrip(response.data);
    } catch (error) {
      console.error('Error fetching trip:', error);
      // Mock data for demo
      setTrip({
        _id: id,
        title: 'European Romance',
        user: 'demo-user',
        destinations: [
          {
            destination: {
              _id: '1',
              name: 'Santorini',
              country: 'Greece',
              city: 'Oia',
              images: [{ url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }],
              description: 'Famous for stunning sunsets and white buildings'
            },
            startDate: '2024-06-01',
            endDate: '2024-06-05',
            experiences: []
          },
          {
            destination: {
              _id: '2',
              name: 'Paris',
              country: 'France',
              city: 'Paris',
              images: [{ url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }],
              description: 'The City of Light with art and culture'
            },
            startDate: '2024-06-06',
            endDate: '2024-06-10',
            experiences: []
          }
        ],
        totalDuration: 10,
        estimatedBudget: { amount: 3500, currency: 'USD' },
        status: 'planning',
        notes: 'Honeymoon trip focusing on romance and culture. Book sunset dinner reservations in advance.',
        createdAt: '2024-01-15'
      });
      setEditedTrip({
        _id: id,
        title: 'European Romance',
        notes: 'Honeymoon trip focusing on romance and culture. Book sunset dinner reservations in advance.',
        status: 'planning'
      });
    }
    setLoading(false);
  };

  const fetchExperiencesForDestination = async (destinationId) => {
    try {
      const response = await axios.get(`/api/experiences?destination=${destinationId}`);
      setAvailableExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      // Mock experiences
      setAvailableExperiences([
        {
          _id: '1',
          title: 'Sunset Wine Tasting in Oia',
          type: 'activity',
          description: 'Experience the world-famous Santorini sunset while tasting exceptional local wines.',
          images: [{ url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }],
          rating: 4.9,
          pricing: { amount: 85, currency: 'USD', per: 'person' },
          duration: '3 hours'
        },
        {
          _id: '2',
          title: 'Luxury Catamaran Cruise',
          type: 'activity',
          description: 'Sail around the caldera on a luxury catamaran with swimming stops.',
          images: [{ url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }],
          rating: 4.7,
          pricing: { amount: 120, currency: 'USD', per: 'person' },
          duration: '5 hours'
        }
      ]);
    }
  };

  const handleEditTrip = () => {
    setEditingTrip(true);
  };

  const handleSaveTrip = async () => {
    try {
      const response = await axios.put(`/api/trips/${id}`, editedTrip);
      setTrip(response.data);
      setEditingTrip(false);
    } catch (error) {
      console.error('Error updating trip:', error);
      // For demo, update local state
      setTrip({ ...trip, ...editedTrip });
      setEditingTrip(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTrip(trip);
    setEditingTrip(false);
  };

  const handleAddExperience = (destinationIndex) => {
    setSelectedDestinationIndex(destinationIndex);
    const destinationId = trip.destinations[destinationIndex].destination._id;
    fetchExperiencesForDestination(destinationId);
    setShowExperienceSelector(true);
  };

  const handleSelectExperience = async (experience) => {
    if (selectedDestinationIndex === null) return;

    try {
      const updatedTrip = { ...trip };
      updatedTrip.destinations[selectedDestinationIndex].experiences.push(experience._id);
      
      const response = await axios.put(`/api/trips/${id}`, updatedTrip);
      setTrip(response.data);
    } catch (error) {
      console.error('Error adding experience:', error);
      // For demo, update local state
      const updatedTrip = { ...trip };
      if (!updatedTrip.destinations[selectedDestinationIndex].experiences) {
        updatedTrip.destinations[selectedDestinationIndex].experiences = [];
      }
      updatedTrip.destinations[selectedDestinationIndex].experiences.push(experience);
      setTrip(updatedTrip);
    }

    setShowExperienceSelector(false);
    setSelectedDestinationIndex(null);
  };

  const removeExperience = async (destinationIndex, experienceIndex) => {
    if (!window.confirm('Remove this experience from your trip?')) return;

    try {
      const updatedTrip = { ...trip };
      updatedTrip.destinations[destinationIndex].experiences.splice(experienceIndex, 1);
      
      const response = await axios.put(`/api/trips/${id}`, updatedTrip);
      setTrip(response.data);
    } catch (error) {
      console.error('Error removing experience:', error);
      // For demo, update local state
      const updatedTrip = { ...trip };
      updatedTrip.destinations[destinationIndex].experiences.splice(experienceIndex, 1);
      setTrip(updatedTrip);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
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

  if (loading) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading trip...</div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Trip not found</h2>
          <Link to="/trip-planner" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <ArrowLeft size={18} />
            Back to Trip Planner
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '3rem 0' }}>
        <div className="container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/trip-planner" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}
            >
              <ArrowLeft size={18} />
              Back to Trip Planner
            </Link>
            
            {editingTrip ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={editedTrip.title}
                  onChange={(e) => setEditedTrip({ ...editedTrip, title: e.target.value })}
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    color: 'white',
                    flex: 1
                  }}
                />
                <button onClick={handleSaveTrip} className="btn btn-secondary">
                  <Save size={18} />
                  Save
                </button>
                <button onClick={handleCancelEdit} className="btn" style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                  <X size={18} />
                  Cancel
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0 }}>
                  {trip.title}
                </h1>
                <button onClick={handleEditTrip} className="btn btn-secondary">
                  <Edit3 size={18} />
                  Edit Trip
                </button>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <span style={{
                background: getStatusColor(trip.status),
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                textTransform: 'capitalize',
                fontWeight: '500'
              }}>
                {trip.status}
              </span>
              {trip.totalDuration > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={18} />
                  <span>{trip.totalDuration} days</span>
                </div>
              )}
              {trip.estimatedBudget?.amount > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <DollarSign size={18} />
                  <span>${trip.estimatedBudget.amount} {trip.estimatedBudget.currency}</span>
                </div>
              )}
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {trip.destinations?.length || 0} destinations
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trip Notes */}
      {(trip.notes || editingTrip) && (
        <section style={{ background: 'white', borderBottom: '1px solid #eee', padding: '2rem 0' }}>
          <div className="container">
            {editingTrip ? (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Trip Notes
                </label>
                <textarea
                  value={editedTrip.notes || ''}
                  onChange={(e) => setEditedTrip({ ...editedTrip, notes: e.target.value })}
                  placeholder="Add notes about your trip..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>
            ) : trip.notes && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#667eea' }}>
                  Trip Notes
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
                  {trip.notes}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Destinations & Experiences */}
      <section className="section">
        <div className="container">
          {trip.destinations && trip.destinations.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {trip.destinations.map((dest, destIndex) => (
                <motion.div
                  key={destIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: destIndex * 0.1 }}
                  className="card"
                  style={{ overflow: 'visible' }}
                >
                  {/* Destination Header */}
                  <div style={{ 
                    background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${dest.destination.images?.[0]?.url || 'https://via.placeholder.com/800x200'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    padding: '3rem 2rem',
                    borderRadius: '12px 12px 0 0'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>
                          {dest.destination.name}
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                          <MapPin size={18} />
                          <span>{dest.destination.city}, {dest.destination.country}</span>
                        </div>
                        {dest.startDate && dest.endDate && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                            <Calendar size={18} />
                            <span>{formatDate(dest.startDate)} - {formatDate(dest.endDate)}</span>
                          </div>
                        )}
                      </div>
                      <Link 
                        to={`/destinations/${dest.destination._id}`}
                        className="btn btn-secondary"
                        style={{ color: '#667eea', background: 'white' }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Experiences Section */}
                  <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                        Experiences ({dest.experiences?.length || 0})
                      </h3>
                      <button 
                        onClick={() => handleAddExperience(destIndex)}
                        className="btn btn-primary"
                      >
                        <Plus size={18} />
                        Add Experience
                      </button>
                    </div>

                    {dest.experiences && dest.experiences.length > 0 ? (
                      <div className="grid grid-2" style={{ gap: '1.5rem' }}>
                        {dest.experiences.map((experience, expIndex) => (
                          <div key={expIndex} className="card" style={{ position: 'relative' }}>
                            <img 
                              src={experience.images?.[0]?.url || 'https://via.placeholder.com/400x200'} 
                              alt={experience.title}
                              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                            />
                            <div style={{ padding: '1rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                                  {experience.title}
                                </h4>
                                <button
                                  onClick={() => removeExperience(destIndex, expIndex)}
                                  style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    cursor: 'pointer', 
                                    color: '#dc3545',
                                    padding: '0.25rem'
                                  }}
                                  title="Remove experience"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.4' }}>
                                {experience.description}
                              </p>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ffa500' }}>
                                  <Star size={14} fill="currentColor" />
                                  <span style={{ fontSize: '0.9rem' }}>{experience.rating}</span>
                                </div>
                                {experience.pricing && (
                                  <div style={{ color: '#667eea', fontWeight: '500' }}>
                                    ${experience.pricing.amount}
                                  </div>
                                )}
                              </div>
                              {experience.duration && (
                                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
                                  Duration: {experience.duration}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '3rem 0', color: '#666' }}>
                        <p style={{ marginBottom: '1rem' }}>No experiences added yet</p>
                        <p style={{ fontSize: '0.9rem', color: '#888' }}>
                          Add activities, restaurants, and attractions to make your trip memorable
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#666' }}>
                No destinations in this trip yet
              </h3>
              <Link to="/trip-planner" className="btn btn-primary">
                Add Destinations
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Experience Selector Modal */}
      {showExperienceSelector && (
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
            <div style={{ 
              padding: '2rem 2rem 1rem 2rem',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                Add Experience
              </h3>
              <button 
                onClick={() => setShowExperienceSelector(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
              {availableExperiences.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                  No experiences available for this destination
                </div>
              ) : (
                <div className="grid grid-2" style={{ gap: '1.5rem' }}>
                  {availableExperiences.map((experience) => (
                    <div 
                      key={experience._id} 
                      className="card" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSelectExperience(experience)}
                    >
                      <img 
                        src={experience.images?.[0]?.url || 'https://via.placeholder.com/400x150'} 
                        alt={experience.title}
                        style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '1rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                          {experience.title}
                        </h4>
                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.4' }}>
                          {experience.description}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ffa500' }}>
                            <Star size={14} fill="currentColor" />
                            <span style={{ fontSize: '0.9rem' }}>{experience.rating}</span>
                          </div>
                          {experience.pricing && (
                            <div style={{ color: '#667eea', fontWeight: '500' }}>
                              ${experience.pricing.amount}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TripDetail;