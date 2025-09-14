import React from 'react';
import './TechExperience.css';

const TechExperience = () => {
  const mockProperties = [
    {
      id: 1,
      title: 'Modern Studio in King Fahd District',
      price: 'SAR 3,200',
      period: 'per month',
      image: 'studio-apartment',
      features: ['WiFi', 'Kitchen', 'Gym']
    },
    {
      id: 2,
      title: 'Luxury 2BR in Olaya District',
      price: 'SAR 5,800',
      period: 'per month',
      image: 'luxury-apartment',
      features: ['Pool', 'Parking', 'Balcony']
    },
    {
      id: 3,
      title: 'Executive Suite in Al Malqa',
      price: 'SAR 4,500',
      period: 'per month',
      image: 'executive-suite',
      features: ['Office', 'Terrace', 'Security']
    },
    {
      id: 4,
      title: 'Family Home in Diplomatic Quarter',
      price: 'SAR 7,200',
      period: 'per month',
      image: 'family-home',
      features: ['Garden', '3BR', 'Maid Room']
    }
  ];

  return (
    <section className="tech-experience section">
      <div className="container-wide">
        <div className="tech-content">
          <div className="tech-text">
            <h2>Streamlined tech experience</h2>
            <p>Search our live listings online, book instantly, and move in easily. Then use our guest app for support, home cleanings, and more.</p>
          </div>
          
          <div className="tech-demo">
            <div className="demo-interface">
              <div className="interface-header">
                <div className="interface-tabs">
                  <span className="tab active">All Listings</span>
                  <span className="tab">Map View</span>
                  <span className="tab">Filters</span>
                </div>
                <div className="interface-search">
                  <input type="text" placeholder="Search locations..." />
                </div>
              </div>
              
              <div className="properties-grid">
                {mockProperties.map((property) => (
                  <div key={property.id} className="property-card">
                    <div className={`property-image ${property.image}`}></div>
                    <div className="property-info">
                      <h4>{property.title}</h4>
                      <div className="property-price">
                        <span className="price">{property.price}</span>
                        <span className="period">{property.period}</span>
                      </div>
                      <div className="property-features">
                        {property.features.map((feature, index) => (
                          <span key={index} className="feature-tag">{feature}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="support-panel">
              <div className="support-header">
                <h4>Support</h4>
                <div className="support-status">
                  <div className="status-dot"></div>
                  <span>Online</span>
                </div>
              </div>
              
              <div className="support-options">
                <div className="support-item">
                  <div className="support-icon">🏠</div>
                  <div>
                    <h5>Property Support</h5>
                    <p>24/7 maintenance assistance</p>
                  </div>
                </div>
                
                <div className="support-item">
                  <div className="support-icon">🧹</div>
                  <div>
                    <h5>Cleaning Service</h5>
                    <p>Schedule weekly cleanings</p>
                  </div>
                </div>
                
                <div className="support-item">
                  <div className="support-icon">📱</div>
                  <div>
                    <h5>Mobile App</h5>
                    <p>Manage everything on-the-go</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechExperience;
