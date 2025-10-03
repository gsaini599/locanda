import React, { useEffect, useMemo, useState } from 'react';
import './SearchResults.css';
import placeholderImg from '../Resources/studio.jpg';

function useQuery() {
  const [q, setQ] = useState('');
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const [, searchPart = ''] = hash.split('?');
    const params = new URLSearchParams(searchPart);
    setQ((params.get('q') || '').trim());
    const onHash = () => {
      const hash2 = window.location.hash.replace('#', '');
      const [, sp = ''] = hash2.split('?');
      const p2 = new URLSearchParams(sp);
      setQ((p2.get('q') || '').trim());
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return q;
}

export default function SearchResults() {
  const q = useQuery();
  const [rows, setRows] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch('/data/tableExport.json', { cache: 'no-store' });
      const json = await res.json();
      const data = Array.isArray(json?.data) ? json.data.filter(r => r && r.ID) : [];
      const imgRes = await fetch('/data/images-manifest.json', { cache: 'no-store' }).catch(() => null);
      const manifest = imgRes && imgRes.ok ? await imgRes.json() : null;
      const imgs = Array.isArray(manifest?.listings) ? manifest.listings : [];
      if (!cancelled) {
        setRows(data);
        setImages(imgs);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const term = (q || '').toLowerCase();
    if (!term) return rows;
    return rows.filter(r => {
      const city = String(r['City'] || '').toLowerCase();
      const addr = String(r['Formatted Address'] || '').toLowerCase();
      const name = (() => {
        try {
          const arr = JSON.parse(r['Listing Descriptions'] || '[]');
          const en = Array.isArray(arr) ? arr.find((d) => d.language === 'en') || arr[0] : null;
          return (en?.name || en?.summary || '').toLowerCase();
        } catch { return ''; }
      })();
      return city.includes(term) || addr.includes(term) || name.includes(term);
    });
  }, [rows, q]);

  const getTitle = (r) => {
    try {
      const arr = JSON.parse(r['Listing Descriptions'] || '[]');
      const en = Array.isArray(arr) ? arr.find((d) => d.language === 'en') || arr[0] : null;
      return en?.name || en?.summary || 'Listing';
    } catch { return 'Listing'; }
  };

  const pickThumb = (r) => {
    if (!images.length) return placeholderImg;
    const key = Number(String(r.ID).slice(-6)) || 0;
    const file = images[key % images.length];
    const imagePath = `/images/listings/${file}`;
    console.log('Loading image for listing', r.ID, ':', imagePath);
    return imagePath;
  };

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.src = placeholderImg;
  };

  return (
    <section className="section">
      <div className="container">
        <div className="sr-header">
          <h2>Search results {q ? `for "${q}"` : ''}</h2>
          <div className="sr-count">{loading ? 'Loading…' : `${filtered.length} place(s)`}</div>
        </div>
        <div className="sr-grid">
          {!loading && filtered.map(r => (
            <div key={r.ID} className="sr-card" onClick={() => { window.location.hash = `/listing/${r.ID}`; window.scrollTo({top:0, behavior:'smooth'}); }} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' ') { window.location.hash = `/listing/${r.ID}`; } }}>
              <div className="sr-thumb">
                <img 
                  src={pickThumb(r)} 
                  alt={getTitle(r)}
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              <div className="sr-body">
                <h3 className="sr-title">{getTitle(r)}</h3>
                <div className="sr-meta">
                  <span>{r['City']}, {r['Country']}</span>
                  <span>•</span>
                  <span>{r['Bedrooms']} BR · {r['Bathrooms']} BA · {r['Beds']} Beds</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
