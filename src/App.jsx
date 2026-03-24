import React, { useState, useEffect, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Internship from './components/Internship';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Loader from './components/Loader';
import CodingProfiles from './components/CodingProfiles';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative min-h-screen bg-[#1a1a1a] text-[#e8e8e8] w-full">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Internship />
          <Projects />
          <Achievements />
          <Certificates />
          <CodingProfiles />
          <Contact />
        </div>
      )}
    </>
  );
}

export default App;
