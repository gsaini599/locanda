import React from 'react';
import './LifestyleCards.css';

const LifestyleCards = () => {
  const lifestyleOptions = [
    {
      id: 'annual',
      title: 'Annual stays, lower rates',
      description: 'A full year of furnished living at the cost of an unfurnished rental',
      badge: 'LIVE@LOCANDA',
      color: 'teal',
      image: 'annual-stays'
    },
    {
      id: 'business',
      title: 'Work hard, stay comfortable',
      description: 'Flexible terms and comfortable homes for corporate travelers',
      badge: 'LOCANDA FOR BUSINESS',
      color: 'blue',
      image: 'business-stays'
    },
    {
      id: 'student',
      title: 'Near campus, A+ discounts',
      description: 'Big savings and special perks for private student apartments',
      badge: 'LOCANDA STUDENT',
      color: 'orange',
      image: 'student-stays'
    }
  ];

  return (
    <section className="lifestyle-cards section">
      <div className="container">
        <div className="section-header">
          <h2>Find what suits your lifestyle</h2>
        </div>
        
        <div className="cards-grid">
          {lifestyleOptions.map((option) => (
            <div key={option.id} className={`lifestyle-card card-${option.color}`}>
              <div className="card-image">
                <div className={`placeholder-image ${option.image}`}></div>
              </div>
              
              <div className="card-content">
                <div className="card-badge">
                  {option.badge}
                </div>
                
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                
                <button className="btn btn-outline learn-more-btn">
                  Learn more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleCards;
