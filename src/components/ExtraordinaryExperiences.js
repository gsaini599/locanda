import React, { useState } from 'react';
import './ExtraordinaryExperiences.css';

const ExtraordinaryExperiences = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const experiences = [
    {
      id: 1,
      title: 'Extraordinary experiences unlocked',
      description: 'We elevate your stay with exclusive partner services* — from meal kits and wine delivery to on-demand fitness and car rentals.',
      note: '*partner services vary by city',
      image: 'saudi-hospitality',
      services: ['Traditional Saudi Cuisine', 'Desert Safari Tours', 'Cultural Experiences']
    },
    {
      id: 2,
      title: 'Premium concierge services',
      description: 'Access to premium lifestyle services including personal shopping, event planning, and exclusive dining reservations at Riyadh\'s finest restaurants.',
      note: '*available in major Saudi cities',
      image: 'concierge-services',
      services: ['Personal Shopping', 'Event Planning', 'Fine Dining']
    },
    {
      id: 3,
      title: 'Wellness & Recreation',
      description: 'Enjoy complimentary access to premium fitness centers, spa services, and recreational facilities across the Kingdom.',
      note: '*membership benefits included',
      image: 'wellness-recreation',
      services: ['Premium Gyms', 'Spa Access', 'Recreation Centers']
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % experiences.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <section className="extraordinary-experiences section">
      <div className="experiences-container">
        <div className="experience-slide">
          <div className="slide-image">
            <div className={`experience-image ${experiences[currentSlide].image}`}>
              <div className="image-overlay"></div>
            </div>
          </div>
          
          <div className="slide-content">
            <div className="slide-number">
              {String(currentSlide + 1).padStart(2, '0')}
            </div>
            
            <h2>{experiences[currentSlide].title}</h2>
            <p>{experiences[currentSlide].description}</p>
            
            <div className="services-list">
              {experiences[currentSlide].services.map((service, index) => (
                <div key={index} className="service-item">
                  <div className="service-icon">✓</div>
                  <span>{service}</span>
                </div>
              ))}
            </div>
            
            <p className="experience-note">{experiences[currentSlide].note}</p>
          </div>
        </div>
        
        <div className="carousel-controls">
          <button 
            className="carousel-btn prev-btn" 
            onClick={prevSlide}
            aria-label="Previous experience"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          
          <div className="carousel-dots">
            {experiences.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="carousel-btn next-btn" 
            onClick={nextSlide}
            aria-label="Next experience"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExtraordinaryExperiences;
