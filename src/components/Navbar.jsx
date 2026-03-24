import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Internships', to: 'internship' },
    { name: 'Projects', to: 'projects' },
    { name: 'Achievements', to: 'achievements' },
    { name: 'Certificates', to: 'certificates' },
    { name: 'Stats', to: 'coding-profiles' },
    { name: 'Contact', to: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-[#c9a961]/10' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative">
        <Link to="hero" smooth duration={500} className="text-2xl font-bold cursor-pointer text-[#e8e8e8] whitespace-nowrap z-10">
          MK<span className="text-[#c9a961]">.❑</span>
        </Link>

        <div className="hidden md:flex space-x-6 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth
              duration={500}
              spy
              activeClass="text-[#c9a961]"
              className="text-sm font-medium text-[#b8b8c8] hover:text-[#c9a961] cursor-pointer transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden z-10">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#e8e8e8] focus:outline-none">
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[#c9a961]/10"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth
                  duration={500}
                  spy
                  activeClass="text-[#c9a961]"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-[#b8b8c8] hover:text-[#c9a961] cursor-pointer transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
