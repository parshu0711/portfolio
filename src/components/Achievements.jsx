import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCode, FaTrophy, FaLightbulb, FaUsers, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const achievements = [
  {
    icon: <FaTrophy className="text-6xl text-[#c9a961] mb-6 drop-shadow-[0_0_15px_rgba(201,169,97,0.5)]" />,
    title: "Technical Interview Success",
    description: "Cleared technical interviews across three companies, contributing to four production-level industry projects and earning a Pre-Placement Offer (PPO) for strong technical performance.",
  },
  {
    icon: <FaCode className="text-6xl text-[#9b8b7e] mb-6" />,
    title: "Consistent Coding Streak",
    description: "Maintained 150+ consecutive days of active coding, completing 500+ problem submissions across competitive programming platforms.",
  },
  {
    icon: <FaLightbulb className="text-6xl text-[#c9a961] mb-6 drop-shadow-[0_0_15px_rgba(201,169,97,0.5)]" />,
    title: "Data Structures & Algorithms",
    description: "Solved 200+ DSA problems on platforms like LeetCode, strengthening problem-solving skills and algorithmic thinking.",
  },
  {
    icon: <FaUsers className="text-6xl text-[#9b8b7e] mb-6" />,
    title: "Real-World Project Experience",
    description: "Contributed to multiple industry-level projects, gaining hands-on experience in building scalable and production-ready applications.",
  },
];

const PageContentLeft = ({ item, pageNum, isBackFace = false }) => (
  <div className={`w-full h-full flex flex-col items-center justify-center p-8 bg-[#242424] relative overflow-hidden backface-hidden ${isBackFace ? 'border-l border-[#333]' : 'border-r border-[#333]'}`}>
    {/* Texture & Page Number */}
    {/* Shadow Gradient: Approaches Spine */}
    <div className={`absolute inset-0 pointer-events-none ${isBackFace ? 'bg-gradient-to-r from-black/30 to-transparent' : 'bg-gradient-to-l from-black/30 to-transparent'}`} />
    
    <div className={`absolute top-6 text-[#444] font-serif italic opacity-30 text-sm ${isBackFace ? 'right-6' : 'left-6'}`}>
        Page {pageNum}
    </div>
    
    <div className="transform transition-all duration-500 hover:scale-110 relative z-10">
        {item.icon}
    </div>
    <h3 className="text-xl md:text-3xl font-bold text-[#e8e8e8] mt-4 font-serif text-center relative z-10">
        {item.title}
    </h3>
  </div>
);

const PageContentRight = ({ item, pageNum }) => (
  <div className="w-full h-full flex flex-col items-start justify-center p-8 bg-[#2a2a2a] relative overflow-hidden backface-hidden">
    {/* Texture & Page Number */}
    {/* Shadow Gradient: Approaches Spine (Left edge) */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
    <div className="absolute top-6 right-6 text-[#444] font-serif italic opacity-30 text-sm">Page {pageNum}</div>
    
    <div className="prose prose-invert relative z-10 w-full">
        <h4 className="text-[#c9a961] text-sm md:text-lg font-semibold mb-6 uppercase tracking-widest border-b border-[#c9a961]/30 pb-2 inline-block">
            Detail
        </h4>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {item.description}
        </p>
    </div>
    
    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#c9a961]/10 to-transparent rounded-tl-full" />
  </div>
);

const Achievements = () => {
    // Current "Item" Index. 
    // Corresponds to how many pages are flipped.
    // If 0: 0 pages flipped. Showing Item 0 (Left and Right).
    // If 1: 1 page flipped. Showing Item 1 (Left and Right).
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalItems = achievements.length;

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
        // Loop back to start? Or stay?
        // Loop for carousel feel
        setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
        // Loop to end
        setCurrentIndex(totalItems - 1);
    }
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
        handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section id="achievements" className="relative min-h-screen bg-[#1a1a1a] text-[#e8e8e8] py-20 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Header */}
      <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 font-serif relative inline-block">
            <span className="text-[#c9a961]">A</span>chievements
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#c9a961]/50 rounded-full" />
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm mt-4">
            Milestones in the journey of endless learning.
          </p>
      </motion.div>

      {/* Book Container */}
      <div className="relative w-full max-w-5xl h-[50vh] min-h-[400px] flex justify-center items-center perspective-[2000px]">
        
        {/* The Book Itself */}
        <div className="relative w-full md:w-[90%] lg:w-[80%] h-full flex shadow-2xl preserve-3d">
            
            {/* STATIC LEFT BASE: Item 0 Left */}
            <div className="absolute left-0 top-0 w-1/2 h-full z-0">
                <PageContentLeft item={achievements[0]} pageNum={1} isBackFace={false} />
            </div>

            {/* STATIC RIGHT BASE: Last Item Right */}
            {/* This is only visible if we flip all pages. */}
             <div className="absolute right-0 top-0 w-1/2 h-full z-0">
                <PageContentRight item={achievements[totalItems - 1]} pageNum={totalItems * 2} />
            </div>


            {/* MOVING PAGES (N-1 Papers) */}
            {/* We create papers for interactions 0->1, 1->2, 2->3 ... */}
            {achievements.slice(0, totalItems - 1).map((_, i) => {
                // Paper i handles the transition between Item i and Item i+1
                // Front: Item i Right
                // Back: Item i+1 Left
                
                // If currentIndex > i, this paper is FLIPPED (on left).
                // If currentIndex <= i, this paper is NOT FLIPPED (on right).
                
                const isFlipped = currentIndex > i;
                
                return (
                    <motion.div
                        key={i}
                        className="absolute right-0 top-0 w-1/2 h-full origin-left preserve-3d"
                        style={{ willChange: "transform" }}
                        initial={{ rotateY: 0, zIndex: totalItems - i }}
                        animate={{ 
                            rotateY: isFlipped ? -180 : 0,
                            zIndex: isFlipped ? i + 1 : totalItems - i 
                        }}
                        transition={{ 
                            rotateY: { duration: 0.6, ease: [0.645, 0.045, 0.355, 1.0] }, // cubic-bezier for "heavy page" feel
                            zIndex: { delay: isFlipped ? 0.3 : 0 } // Delay z-Index change so it stays on top while moving to left
                        }}
                    >
                        {/* FRONT FACE (Item i Right) */}
                        <div className="absolute inset-0 w-full h-full backface-hidden" style={{ transform: "rotateY(0deg) translateZ(1px)", backfaceVisibility: "hidden" }}>
                            <PageContentRight item={achievements[i]} pageNum={2 * i + 2} />
                            {/* Inner Shadow for spine */}
                            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                            {/* Dynamic Lighting Overlay */}
                             <motion.div 
                                className="absolute inset-0 bg-black pointer-events-none"
                                animate={{ opacity: isFlipped ? 0.5 : 0 }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>

                        {/* BACK FACE (Item i+1 Left) */}
                        <div className="absolute inset-0 w-full h-full backface-hidden" style={{ transform: "rotateY(180deg) translateZ(1px)", backfaceVisibility: "hidden" }}>
                            <PageContentLeft item={achievements[i + 1]} pageNum={2 * (i + 1) + 1} isBackFace={true} />
                            {/* Inner Shadow for spine (Now handled by component prop logic mostly, but we can add overlay if needed) */}
                             {/* Dynamic Lighting Overlay */}
                            <motion.div 
                                className="absolute inset-0 bg-black pointer-events-none"
                                animate={{ opacity: isFlipped ? 0 : 0.5 }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </motion.div>
                );
            })}

        </div>

    </div>

    {/* Controls */}
    <div className="flex gap-8 mt-10 z-20 items-center justify-center w-full">
        <button 
            onClick={handlePrev}
            className="p-4 rounded-full bg-[#242424] border border-[#333] hover:border-[#c9a961] hover:text-[#c9a961] transition-colors shadow-lg group"
        >
            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <span className="flex items-center font-mono text-gray-500">
            {currentIndex + 1} / {totalItems}
        </span>
        <button 
            onClick={handleNext}
            className="p-4 rounded-full bg-[#242424] border border-[#333] hover:border-[#c9a961] hover:text-[#c9a961] transition-colors shadow-lg group"
        >
            <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
    </div>

    </section>
  );
};

export default Achievements;
