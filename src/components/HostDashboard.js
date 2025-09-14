import React, { useState } from 'react';
import './HostDashboard.css';

const HostDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [properties] = useState([
    {
      id: 1,
      title: 'Luxury 2BR in Olaya District',
      location: 'Olaya, Riyadh',
      price: 450,
      status: 'active',
      bookings: 12,
      rating: 4.8,
      earnings: 5400,
      image: 'luxury-apartment'
    },
    {
      id: 2,
      title: 'Modern Studio in King Fahd',
      location: 'King Fahd District, Riyadh',
      price: 280,
      status: 'active',
      bookings: 8,
      rating: 4.6,
      earnings: 2240,
      image: 'studio-apartment'
    },
    {
      id: 3,
      title: 'Executive Suite in Al Malqa',
      location: 'Al Malqa, Riyadh',
      price: 650,
      status: 'inactive',
      bookings: 0,
      rating: 0,
      earnings: 0,
      image: 'executive-suite'
    }
  ]);

  const [recentBookings] = useState([
    {
      id: 1,
      guest: 'Sarah Al-Mahmoud',
      property: 'Luxury 2BR in Olaya District',
      checkIn: '2024-01-15',
      checkOut: '2024-01-22',
      status: 'confirmed',
      amount: 3150
    },
    {
      id: 2,
      guest: 'Mohammed Al-Rashid',
      property: 'Modern Studio in King Fahd',
      checkIn: '2024-01-20',
      checkOut: '2024-01-25',
      status: 'pending',
      amount: 1400
    },
    {
      id: 3,
      guest: 'Fatima Al-Zahra',
      property: 'Luxury 2BR in Olaya District',
      checkIn: '2024-01-10',
      checkOut: '2024-01-17',
      status: 'completed',
      amount: 3150
    }
  ]);

  const totalEarnings = properties.reduce((sum, property) => sum + property.earnings, 0);
  const totalBookings = properties.reduce((sum, property) => sum + property.bookings, 0);
  const activeProperties = properties.filter(p => p.status === 'active').length;

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon earnings">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">SAR {totalEarnings.toLocaleString()}</div>
            <div className="stat-label">Total Earnings</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bookings">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{totalBookings}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon properties">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{activeProperties}</div>
            <div className="stat-label">Active Properties</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rating">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">4.7</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="recent-bookings-section">
          <h3>Recent Bookings</h3>
          <div className="bookings-list">
            {recentBookings.map(booking => (
              <div key={booking.id} className="booking-item">
                <div className="booking-guest">
                  <div className="guest-avatar">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="guest-info">
                    <div className="guest-name">{booking.guest}</div>
                    <div className="booking-property">{booking.property}</div>
                  </div>
                </div>
                <div className="booking-dates">
                  <div className="check-dates">{booking.checkIn} - {booking.checkOut}</div>
                  <div className={`booking-status ${booking.status}`}>{booking.status}</div>
                </div>
                <div className="booking-amount">SAR {booking.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-btn primary" onClick={() => setActiveTab('add-property')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add New Property
            </button>
            <button className="action-btn secondary" onClick={() => setActiveTab('properties')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Manage Properties
            </button>
            <button className="action-btn secondary" onClick={() => setActiveTab('bookings')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
              </svg>
              View All Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="properties-management">
      <div className="properties-header">
        <h2>My Properties</h2>
        <button className="btn btn-primary" onClick={() => setActiveTab('add-property')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Add Property
        </button>
      </div>
      
      <div className="properties-grid">
        {properties.map(property => (
          <div key={property.id} className="property-card">
            <div className={`property-image ${property.image}`}></div>
            <div className="property-content">
              <div className="property-header">
                <h4>{property.title}</h4>
                <div className={`property-status ${property.status}`}>
                  {property.status}
                </div>
              </div>
              <p className="property-location">{property.location}</p>
              <div className="property-stats">
                <div className="stat">
                  <span className="stat-label">Price/night:</span>
                  <span className="stat-value">SAR {property.price}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Bookings:</span>
                  <span className="stat-value">{property.bookings}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Rating:</span>
                  <span className="stat-value">{property.rating > 0 ? property.rating : 'N/A'}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Earnings:</span>
                  <span className="stat-value">SAR {property.earnings.toLocaleString()}</span>
                </div>
              </div>
              <div className="property-actions">
                <button className="btn btn-outline">Edit</button>
                <button className="btn btn-outline">View</button>
                <button className="btn btn-outline">Analytics</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAddProperty = () => (
    <div className="add-property-form">
      <h2>Add New Property</h2>
      <form className="property-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Property Title</label>
              <input type="text" placeholder="e.g., Luxury 2BR Apartment in Riyadh" />
            </div>
            <div className="form-group">
              <label>Property Type</label>
              <select>
                <option>Studio</option>
                <option>1 Bedroom</option>
                <option>2 Bedroom</option>
                <option>3 Bedroom</option>
                <option>Villa</option>
                <option>Penthouse</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="District, City" />
            </div>
            <div className="form-group">
              <label>Price per Night (SAR)</label>
              <input type="number" placeholder="0" />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Property Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Bedrooms</label>
              <select>
                <option>Studio</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>
            <div className="form-group">
              <label>Bathrooms</label>
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>
            <div className="form-group">
              <label>Max Guests</label>
              <input type="number" min="1" max="16" />
            </div>
            <div className="form-group">
              <label>Area (sqm)</label>
              <input type="number" placeholder="0" />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Amenities</h3>
          <div className="amenities-grid">
            {['WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Pool', 'Gym', 'Balcony', 'Furnished'].map(amenity => (
              <label key={amenity} className="amenity-checkbox">
                <input type="checkbox" />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Description</h3>
          <div className="form-group">
            <label>Property Description</label>
            <textarea rows="4" placeholder="Describe your property..."></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={() => setActiveTab('properties')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Property
          </button>
        </div>
      </form>
    </div>
  );

  const renderBookings = () => (
    <div className="bookings-management">
      <h2>All Bookings</h2>
      <div className="bookings-filters">
        <select>
          <option>All Bookings</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
        <select>
          <option>All Properties</option>
          {properties.map(property => (
            <option key={property.id}>{property.title}</option>
          ))}
        </select>
      </div>
      
      <div className="bookings-table">
        <div className="table-header">
          <div>Guest</div>
          <div>Property</div>
          <div>Check-in</div>
          <div>Check-out</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Actions</div>
        </div>
        {recentBookings.map(booking => (
          <div key={booking.id} className="table-row">
            <div className="guest-cell">
              <div className="guest-avatar small">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <span>{booking.guest}</span>
            </div>
            <div>{booking.property}</div>
            <div>{booking.checkIn}</div>
            <div>{booking.checkOut}</div>
            <div>
              <span className={`status-badge ${booking.status}`}>
                {booking.status}
              </span>
            </div>
            <div>SAR {booking.amount.toLocaleString()}</div>
            <div className="actions-cell">
              <button className="btn btn-sm btn-outline">View</button>
              <button className="btn btn-sm btn-outline">Message</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="host-dashboard">
      <div className="dashboard-header">
        <h1>Host Dashboard</h1>
        <div className="dashboard-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            Properties
          </button>
          <button 
            className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
          <button 
            className={`tab ${activeTab === 'add-property' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-property')}
          >
            Add Property
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'properties' && renderProperties()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'add-property' && renderAddProperty()}
      </div>
    </div>
  );
};

export default HostDashboard;
