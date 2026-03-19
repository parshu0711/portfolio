import React from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 font-sans selection:bg-blue-500/30">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
