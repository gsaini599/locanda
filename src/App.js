import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LifestyleCards from './components/LifestyleCards';
import TechExperience from './components/TechExperience';
import ExtraordinaryExperiences from './components/ExtraordinaryExperiences';
import FeaturesGrid from './components/FeaturesGrid';
import HostDashboard from './components/HostDashboard';
import ListingDetail from './components/ListingDetail';
import SearchResults from './components/SearchResults';

function App() {
  const [isHost, setIsHost] = useState(false);
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Simple hash routing: #/listing/:id -> ListingDetail
  const route = hash.replace('#', '');
  const listingMatch = route.match(/^\/listing\/(\d+)/);
  const isSearch = route.startsWith('/search');
  const listingId = listingMatch ? listingMatch[1] : null;

  return (
    <div className="App">
      <Header isHost={isHost} setIsHost={setIsHost} />
      {listingId ? (
        <ListingDetail listingId={listingId} />
      ) : isSearch ? (
        <SearchResults />
      ) : isHost ? (
        <HostDashboard />
      ) : (
        <>
          <HeroSection />
          <LifestyleCards />
          <TechExperience />
          <ExtraordinaryExperiences />
          <FeaturesGrid />
        </>
      )}
    </div>
  );
}

export default App;
