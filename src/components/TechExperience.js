import React, { useEffect, useMemo, useState } from 'react';
import './TechExperience.css';
import studioImg from '../Resources/studio.jpg';

const TechExperience = () => {
  const [rows, setRows] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/data/tableExport.json', { cache: 'no-store' });
        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data.filter(r => r && r.ID) : [];
        
        // Load images manifest
        const imgRes = await fetch('/data/images-manifest.json', { cache: 'no-store' }).catch(() => null);
        const manifest = imgRes && imgRes.ok ? await imgRes.json() : null;
        const imgs = Array.isArray(manifest?.listings) ? manifest.listings : [];
        
        if (!cancelled) {
          setRows(data);
          setImages(imgs);
        }
      } catch (e) {
        if (!cancelled) setError('Failed to load listings');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Function to get property image
  const getPropertyImage = (property) => {
    if (!images.length) return studioImg;
    const key = Number(String(property.ID).slice(-6)) || 0;
    const file = images[key % images.length];
    return `/images/listings/${file}`;
  };

  const cards = useMemo(() => {
    return rows.slice(0, 8).map((r, idx) => {
      // Title from listing descriptions
      let title = 'Listing';
      try {
        const arr = JSON.parse(r['Listing Descriptions'] || '[]');
        const en = Array.isArray(arr) ? arr.find(d => d.language === 'en') || arr[0] : null;
        title = en?.name || en?.summary || title;
      } catch {}

      // Features from amenities (pick first three, prettified)
      let features = [];
      try {
        const am = JSON.parse(r['Amenities'] || '[]');
        features = (Array.isArray(am) ? am : []).slice(0, 3).map(a => a.replace(/_/g, ' ').replace(/\b\w/g, m => m.toUpperCase()));
      } catch {}

      return {
        id: r.ID,
        title,
        period: 'per month',
        // Optionally compute a placeholder price based on bedrooms if desired
        price: r.Bedrooms ? `SAR ${(Math.max(2500, 2500 + r.Bedrooms * 600)).toLocaleString()}` : 'SAR 3,200',
        features,
        img: getPropertyImage(r),
      };
    });
  }, [rows, images]);

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
                {loading && <div className="property-card" style={{padding:'1rem'}}>Loading…</div>}
                {error && <div className="property-card" style={{padding:'1rem'}}>Error loading listings</div>}
                {!loading && !error && cards.map((property) => (
                  <div
                    key={property.id}
                    className="property-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      window.location.hash = `/listing/${property.id}`;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        window.location.hash = `/listing/${property.id}`;
                      }
                    }}
                  >
                    <div className="property-image">
                      <img 
                        src={property.img} 
                        alt={property.title}
                        onError={(e) => { e.target.src = studioImg; }}
                        loading="lazy"
                      />
                    </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechExperience;
