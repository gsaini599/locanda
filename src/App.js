import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LifestyleCards from './components/LifestyleCards';
import TechExperience from './components/TechExperience';
import ExtraordinaryExperiences from './components/ExtraordinaryExperiences';
import FeaturesGrid from './components/FeaturesGrid';
import HostDashboard from './components/HostDashboard';

function App() {
  const [isHost, setIsHost] = useState(false);

  return (
    <div className="App">
      <Header isHost={isHost} setIsHost={setIsHost} />
      {isHost ? (
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
