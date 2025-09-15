import React from 'react';
import './FeaturesGrid.css';

const FeaturesGrid = () => {
  const features = [
    {
      id: 'handpicked',
      title: 'Hand-picked homes',
      description: 'Only the best apartments, buildings, and neighborhoods in the world',
      image: 'handpicked-homes',
    },
    {
      id: 'movein',
      title: 'Move-in ready',
      description: 'Beautifully furnished and curated spaces that are fully equipped from day one',
      image: 'movein-ready',
    },
    {
      id: 'flexible',
      title: 'Flexible terms',
      description: 'Modern leases so you can move in rent and out easily, no month-to-month fees',
      image: 'flexible-terms',
    },
    {
      id: 'service',
      title: 'High-touch service',
      description: 'Reliable support and concierge quality service throughout your stay',
      image: 'high-service',
    }
  ];

  return (
    <section className="features-grid section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Welcome to the future of living</h2>
          <p>Find the peace of mind, flexibility, and confidence to start your latest adventure — a new work gig, a home between leases, or travel fever — with the ease and comfort of a Locanda home.</p>
        </div>
        
        <div className="features-container">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className={`feature-image ${feature.image}`}>
                <div className="feature-icon">
                  {feature.icon}
                </div>
              </div>
              
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cta-section">
          <div className="cta-content">
            <h3>Ready to find your perfect stay?</h3>
            <p>Join thousands of satisfied residents who have made Saudi Arabia their home with Locanda's luxury accommodations.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-large">Start Your Search</button>
              <button className="btn btn-outline btn-large">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
