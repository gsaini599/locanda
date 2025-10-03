import React, { useState } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [searchData, setSearchData] = useState({
    where: '',
    when: ''
  });

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    const q = encodeURIComponent((searchData.where || '').trim());
    window.location.hash = q ? `/search?q=${q}` : '/search';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-image">
          {/* Modern Saudi apartment interior */}
          <div className="hero-placeholder-image"></div>
        </div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Luxury living,<br />redefined</h1>
            <p>Discover extraordinary furnished residences in Saudi Arabia's most prestigious locations. Where sophistication meets comfort, and every detail reflects the pinnacle of modern Arabian hospitality.</p>
          </div>
          
          <div className="search-card">
            <div className="search-inputs">
              <div className="input-group">
                <label htmlFor="where">Where?</label>
                <input
                  id="where"
                  type="text"
                  placeholder="Riyadh, Jeddah, Dammam..."
                  value={searchData.where}
                  onChange={(e) => handleInputChange('where', e.target.value)}
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="when">When?</label>
                <input
                  id="when"
                  type="text"
                  placeholder="Select dates"
                  value={searchData.when}
                  onChange={(e) => handleInputChange('when', e.target.value)}
                />
              </div>
              
              <button className="btn btn-primary btn-large search-btn" onClick={handleSearch}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
