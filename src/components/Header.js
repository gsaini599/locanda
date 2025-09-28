import React, { useState } from 'react';
import './Header.css';
import locandaLogo from '../Resources/locanda-logo.png';

const Header = ({ isHost, setIsHost }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="/" className="logo">
            <div className="logo-icon">
              <img src={locandaLogo} alt="Locanda logo" />
            </div>
            <span className="logo-text">LOCANDA</span>
          </a>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {!isHost ? (
              <>
                <a href="#experience" className="nav-link">Your Experience</a>
                <a href="#landlords" className="nav-link">For Landlords</a>
                <a href="#brokers" className="nav-link">For Brokers</a>
                <a href="#business" className="nav-link">For Business</a>
              </>
            ) : (
              <>
                <a href="#dashboard" className="nav-link">Dashboard</a>
                <a href="#properties" className="nav-link">My Properties</a>
                <a href="#bookings" className="nav-link">Bookings</a>
                <a href="#earnings" className="nav-link">Earnings</a>
              </>
            )}
            <div className="nav-divider"></div>
            
            {/* Guest/Host Toggle */}
            <div className="mode-toggle">
              <button 
                className={`toggle-btn ${!isHost ? 'active' : ''}`}
                onClick={() => setIsHost(false)}
              >
                Guest
              </button>
              <button 
                className={`toggle-btn ${isHost ? 'active' : ''}`}
                onClick={() => setIsHost(true)}
              >
                Host
              </button>
            </div>
            
            <div className="nav-divider"></div>
            
            <div className="language-selector">
              <span className="language-current">EN</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 6l4 4 4-4"/>
              </svg>
            </div>
          </nav>

          {/* Profile Section */}
          <div className="profile-section">
            {!isLoggedIn ? (
              <div className="auth-buttons">
                <button 
                  className="btn btn-outline auth-btn"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Sign In
                </button>
                <button 
                  className="btn btn-primary auth-btn"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="profile-dropdown">
                <button 
                  className="profile-trigger"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="profile-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <span className="profile-name">Ahmed Al-Rashid</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4 6l4 4 4-4"/>
                  </svg>
                </button>
                
                {isProfileOpen && (
                  <div className="profile-menu">
                    <div className="profile-header">
                      <div className="profile-info">
                        <div className="profile-avatar large">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="profile-name-large">Ahmed Al-Rashid</div>
                          <div className="profile-email">ahmed@example.com</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="profile-menu-items">
                      <a href="#profile" className="profile-menu-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Profile Settings
                      </a>
                      
                      {isHost && (
                        <>
                          <a href="#host-dashboard" className="profile-menu-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                            </svg>
                            Host Dashboard
                          </a>
                          <a href="#add-property" className="profile-menu-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                            Add Property
                          </a>
                        </>
                      )}
                      
                      <a href="#bookings" className="profile-menu-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                        My Bookings
                      </a>
                      
                      <a href="#messages" className="profile-menu-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        Messages
                      </a>
                      
                      <a href="#favorites" className="profile-menu-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        Favorites
                      </a>
                      
                      <div className="profile-menu-divider"></div>
                      
                      <a href="#help" className="profile-menu-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                        </svg>
                        Help & Support
                      </a>
                      
                      <button 
                        className="profile-menu-item logout"
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsProfileOpen(false);
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
