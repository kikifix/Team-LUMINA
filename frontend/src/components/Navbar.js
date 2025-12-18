import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Compass, Calendar, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: MapPin },
    { path: '/destinations', label: 'Destinations', icon: Compass },
    ...(isAuthenticated ? [{ path: '/trip-planner', label: 'Trip Planner', icon: Calendar }] : []),
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <MapPin size={24} />
            <span>Wanderlust</span>
          </Link>

          <div className={`nav-links ${isOpen ? 'nav-links-open' : ''}`}>
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${location.pathname === path ? 'nav-link-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="user-menu" style={{ position: 'relative' }}>
                <button
                  className="user-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    color: '#666',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <User size={18} />
                  <span>{user?.name}</span>
                </button>
                
                {showUserMenu && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    padding: '0.5rem 0',
                    minWidth: '150px',
                    zIndex: 1000
                  }}>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                        setIsOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#666',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.background = 'none'}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                  style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            className="nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;