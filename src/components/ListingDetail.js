import React, { useEffect, useMemo, useState } from 'react';
import './ListingDetail.css';
import fallbackHero from '../Resources/studio.jpg';

const amenityLabel = (key) => {
  const map = {
    wireless_internet: 'Wi‑Fi',
    ac: 'AC',
    air_conditioning: 'AC',
    kitchen: 'Kitchen',
    free_parking: 'Free parking',
    gym: 'Gym',
    tv: 'TV',
    washer: 'Washer',
    dryer: 'Dryer',
    heating: 'Heating',
    smoke_detector: 'Smoke detector',
    carbon_monoxide_detector: 'CO detector',
    private_living_room: 'Private living room',
    room_darkening_shades: 'Darkening shades',
    bed_linens: 'Bed linens',
    extra_pillows_and_blankets: 'Extra pillows',
    microwave: 'Microwave',
    coffee_maker: 'Coffee maker',
    refrigerator: 'Refrigerator',
    dishwasher: 'Dishwasher',
    dishes_and_silverware: 'Dishes & silverware',
    cooking_basics: 'Cooking basics',
    oven: 'Oven',
    stove: 'Stove',
    hot_water_kettle: 'Kettle',
    kitchenette: 'Kitchenette',
    dining_table: 'Dining table',
    toaster: 'Toaster',
    blender: 'Blender',
    coffee: 'Coffee',
    shampoo: 'Shampoo',
    hair_dryer: 'Hair dryer',
    iron: 'Iron',
  };
  return map[key] || key.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
};

export default function ListingDetail({ listingId }) {
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([]);
  const [slide, setSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/data/tableExport.json', { cache: 'no-store' });
        const json = await res.json();
        const rows = json?.data || [];
        let row = null;
        if (listingId) {
          row = rows.find(r => String(r.ID) === String(listingId));
        }
        if (!row) row = rows[0];
        if (!row) throw new Error('No listing data');
        if (!cancelled) {
          setListing(row);
        }
        // Load listing->images mapping (authoritative)
        let mapped = [];
        try {
          const mapRes = await fetch('/data/listing-images.json', { cache: 'no-store' });
          if (mapRes.ok) {
            const mapJson = await mapRes.json();
            const arr = mapJson[String(row.ID)];
            if (Array.isArray(arr) && arr.length) mapped = arr;
          }
        } catch {}

        // Load images manifest (fallback if mapping missing)
        const imgRes = await fetch('/data/images-manifest.json', { cache: 'no-store' });
        if (imgRes.ok) {
          const manifest = await imgRes.json();
          const files = Array.isArray(manifest?.listings) ? manifest.listings : [];
          // Deterministic selection based on listingId
          const key = Number(String(row.ID).slice(-6)) || 0;
          const start = files.length ? key % files.length : 0;
          const picks = [];
          for (let i = 0; i < Math.min(12, files.length); i++) {
            picks.push(`/images/listings/${files[(start + i) % files.length]}`);
          }
          if (!cancelled) setGallery(mapped.length ? mapped : picks);
        } else {
          if (!cancelled) setGallery(mapped);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load listing');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [listingId]);

  const amenities = useMemo(() => {
    if (!listing) return [];
    const raw = listing['Amenities'];
    if (!raw || typeof raw !== 'string') return [];
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr.slice(0, 60); // cap to avoid overflow
    } catch (_) {
      // Ignore parse errors
    }
    return [];
  }, [listing]);

  const title = useMemo(() => {
    if (!listing) return '';
    const descRaw = listing['Listing Descriptions'];
    try {
      const arr = JSON.parse(descRaw);
      const en = Array.isArray(arr) ? arr.find((d) => d.language === 'en') || arr[0] : null;
      return en?.name || en?.summary || 'Featured Listing';
    } catch {
      return 'Featured Listing';
    }
  }, [listing]);

  const detailItems = useMemo(() => {
    if (!listing) return [];
    return [
      { label: 'Property Type', value: listing['Property Type'] },
      { label: 'Room Type', value: listing['Room Type'] },
      { label: 'Bedrooms', value: listing['Bedrooms'] },
      { label: 'Bathrooms', value: listing['Bathrooms'] },
      { label: 'Beds', value: listing['Beds'] },
      { label: 'Capacity', value: listing['Person Capacity'] },
      { label: 'Instant Book', value: String(listing['Instant Book']) === 'true' ? 'Yes' : 'No' },
      { label: 'License', value: listing['License'] },
    ].filter((i) => i.value !== undefined && i.value !== null && i.value !== '');
  }, [listing]);

  const address = useMemo(() => {
    if (!listing) return '';
    return listing['Formatted Address'] || listing['Formatted Address Native'] || '';
  }, [listing]);

  const cityCountry = useMemo(() => {
    if (!listing) return '';
    const city = listing['City'];
    const country = listing['Country'];
    return [city, country].filter(Boolean).join(', ');
  }, [listing]);

  const priceDisplay = useMemo(() => {
    if (!listing) return '';
    const base = listing.Bedrooms ? Math.max(2500, 2500 + listing.Bedrooms * 600) : 3200;
    return `SAR ${base.toLocaleString()}`;
  }, [listing]);

  const amenityIcon = (key) => {
    const map = {
      tv: '📺',
      wireless_internet: '📶',
      wifi: '📶',
      ac: '❄️',
      air_conditioning: '❄️',
      kitchen: '🍳',
      free_parking: '🅿️',
      gym: '🏋️',
      washer: '🧺',
      dryer: '🌀',
      heating: '🔥',
      smoke_detector: '🚨',
      carbon_monoxide_detector: '🧯',
      hair_dryer: '💇',
      iron: '🧼',
      coffee_maker: '☕',
      microwave: '🎛️',
      refrigerator: '🧊',
      dishwasher: '🍽️',
      oven: '🍞',
      stove: '🍲',
      balcony: '🌇',
      pool: '🏊',
      parking: '🅿️',
    };
    return map[key] || '•';
  };

  // Photo categories for Airbnb-style gallery
  const photoCategories = [
    { id: 'all', name: 'All photos', icon: '📸' },
    { id: 'living', name: 'Living room', icon: '🛋️' },
    { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
    { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
    { id: 'exterior', name: 'Exterior', icon: '🏠' },
    { id: 'amenities', name: 'Amenities', icon: '✨' }
  ];

  // Categorize photos based on available images
  const categorizedPhotos = useMemo(() => {
    if (!gallery.length) return {};
    
    const categories = {
      all: gallery,
      living: gallery.slice(0, 2),
      bedroom: gallery.slice(2, 4),
      kitchen: gallery.slice(4, 6),
      bathroom: gallery.slice(6, 8),
      exterior: gallery.slice(8, 10),
      amenities: gallery.slice(10, 12)
    };
    
    return categories;
  }, [gallery]);

  const currentPhotos = categorizedPhotos[selectedCategory] || [];

  if (loading) return <div className="container section"><p>Loading listing…</p></div>;
  if (error) return <div className="container section"><p className="error">{error}</p></div>;

  return (
    <section className="ld-section">
      <div className="ld-hero-wrap">
        <img className="ld-hero-img" src={gallery[0] || fallbackHero} alt={title} />
        <div className="ld-hero-overlay" />
        <div className="ld-hero-content container">
          <div className="ld-breadcrumbs">
            <span onClick={() => (window.location.hash = '')} role="button" tabIndex={0}>Home</span>
            <span>/</span>
            <span>Listing</span>
          </div>
          <h1 className="ld-hero-title">{title}</h1>
          <div className="ld-hero-badges">
            <span className="badge">{listing['Property Type']}</span>
            <span className="badge">{listing['Bedrooms']} BR · {listing['Bathrooms']} BA</span>
            <span className="badge">{cityCountry}</span>
          </div>
        </div>
      </div>

      <div className="container ld-layout">
        <main className="ld-main">
          {gallery.length > 0 && (
            <div className="ld-section-card ld-photo-gallery">
              <div className="ld-gallery-header">
                <h3>Photo tour</h3>
                <div className="ld-category-tabs">
                  {photoCategories.map((category) => (
                    <button
                      key={category.id}
                      className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-name">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="ld-gallery-grid">
                {currentPhotos.slice(0, showAllPhotos ? currentPhotos.length : 4).map((photo, index) => (
                  <div key={index} className={`gallery-item ${index === 0 ? 'main-photo' : ''}`}>
                    <img
                      src={photo}
                      alt={`${title} – ${photoCategories.find(c => c.id === selectedCategory)?.name || 'photo'} ${index + 1}`}
                      className="gallery-img"
                    />
                    {index === 0 && (
                      <div className="photo-label">
                        {photoCategories.find(c => c.id === selectedCategory)?.name || 'Photo'}
                      </div>
                    )}
                  </div>
                ))}
                
                {currentPhotos.length > 4 && !showAllPhotos && (
                  <button 
                    className="show-all-photos-btn"
                    onClick={() => setShowAllPhotos(true)}
                  >
                    Show all {currentPhotos.length} photos
                  </button>
                )}
              </div>
            </div>
          )}
          <div className="ld-section-card">
            <h3>About this place</h3>
            <p className="muted">{address}</p>
            <div className="ld-details-grid">
              {detailItems.map((d) => (
                <div key={d.label} className="detail-item">
                  <div className="detail-label">{d.label}</div>
                  <div className="detail-value">{d.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ld-section-card">
            <h3>Amenities</h3>
            <div className="ld-amenities-grid">
              {amenities.length ? (
                amenities.map((a) => (
                  <div key={a} className="amenity-item">
                    <span className="amenity-icon" aria-hidden>{amenityIcon(a)}</span>
                    <span className="amenity-text">{amenityLabel(a)}</span>
                  </div>
                ))
              ) : (
                <span className="muted">No amenities available</span>
              )}
            </div>
          </div>

          <div className="ld-section-card">
            <h3>Location</h3>
            <div className="ld-map-placeholder">
              <div className="map-pin">📍</div>
              <div>
                <div className="map-title">{cityCountry}</div>
                <div className="muted">Lat {listing['Lat']}, Lng {listing['Lng']}</div>
              </div>
            </div>
          </div>
        </main>

        <aside className="ld-aside">
          <div className="booking-card">
            <div className="booking-price">
              <span className="price">{priceDisplay}</span>
              <span className="period">per month</span>
            </div>
            <button className="btn btn-primary btn-large" onClick={() => alert('Booking flow TBD')}>Request to book</button>
            <div className="booking-meta">
              <span>Instant book: {String(listing['Instant Book']) === 'true' ? 'Available' : 'Unavailable'}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
