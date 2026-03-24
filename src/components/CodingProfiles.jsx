import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

const profiles = [
  {
    name: 'LeetCode',
    tag: 'DSA',
    color: '#ffa116',
    total: 575,
    calculatedTotal: 575,
    rating: 1639,
    stats: [
      { label: 'Easy', count: 222, color: '#00b8a3' },
      { label: 'Medium', count: 336, color: '#ffc01e' },
      { label: 'Hard', count: 17, color: '#ef4743' },
    ],
    image: 'https://ik.imagekit.io/parshu0711/coding_profiles/Screenshot%202026-03-24%20023111.png',
    link: 'https://leetcode.com/u/parshu_0711/'
  },
  {
    name: 'Codolio',
    tag: 'Practice',
    color: '#3b82f6',
    total: 679,
    calculatedTotal: 656,
    stats: [
      { label: 'Easy', count: 255, color: '#00b8a3' },
      { label: 'Medium', count: 382, color: '#ffc01e' },
      { label: 'Hard', count: 19, color: '#ef4743' },
    ],
    image: 'https://ik.imagekit.io/parshu0711/coding_profiles/Screenshot%202026-03-25%20010010.png',
    link: 'https://codolio.com/profile/parshu_0711'
  }
];

const CodingProfiles = () => {
  return (
    <section id="coding-profiles" className="py-24 bg-[#0a0a0a] relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#e8e8e8]">
            Coding <span className="text-[#c9a961]">Profiles</span>
          </h2>
          <div className="w-24 h-1 bg-[#c9a961] mx-auto rounded-full shadow-[0_0_10px_rgba(201,169,97,0.3)]"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 w-full">
          {profiles.map((profile, i) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-center w-full max-w-[500px]"
            >
              
              {/* FLIP CARD OUTER WRAPPER */}
              <div className="group w-full h-[400px] sm:h-[450px] md:h-auto md:aspect-[1285/898] [perspective:1000px] shadow-2xl">
                
                {/* 3D FLIP CONTAINER */}
                <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* FRONT SIDE - Optimized density to prevent overflow */}
                  <div className="absolute inset-0 [backface-visibility:hidden] bg-[#151515] border border-gray-800 rounded-sm p-4 sm:p-5 md:p-6 flex flex-col justify-center">
                    
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-center mb-4 pb-3 border-b border-gray-800/80 gap-2">
                      <h3 className="text-xl md:text-2xl font-extrabold" style={{ color: profile.color }}>
                        {profile.name}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold border border-[#c9a961]/30 text-[#c9a961] bg-[#c9a961]/10 uppercase tracking-widest">
                        {profile.tag}
                      </span>
                    </div>

                    {/* Total Summary */}
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                      <div className="flex items-center gap-4">
                        {/* Total Circular Progress */}
                        <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 52 52">
                            <circle cx="26" cy="26" r="22" fill="transparent" stroke="#252525" strokeWidth="4" />
                            <circle 
                              cx="26" cy="26" r="22" fill="transparent" stroke={profile.color} strokeWidth="4"
                              strokeDasharray={2 * Math.PI * 22}
                              strokeDashoffset={0}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-[10px] md:text-xs font-bold" style={{ color: profile.color }}>
                            100%
                          </span>
                        </div>
                        <div>
                          <p className="text-gray-400 text-[10px] md:text-xs font-medium mb-0.5">Problems Solved</p>
                          <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">{profile.total}</p>
                        </div>
                      </div>

                      {profile.rating && (
                        <div className="text-right pl-2">
                          <p className="text-gray-400 text-[10px] md:text-xs font-medium mb-0.5">Contest Rating</p>
                          <p className="text-lg md:text-xl font-bold text-white">{profile.rating}</p>
                        </div>
                      )}
                    </div>

                    {/* Detailed Stats */}
                    <div className="space-y-2.5">
                      {profile.stats.map((stat) => {
                        const percentage = Math.round((stat.count / profile.calculatedTotal) * 100) || 0;
                        const circleCircumference = 2 * Math.PI * 14;
                        const strokeDashoffset = circleCircumference - (percentage / 100) * circleCircumference;
                        
                        return (
                          <div key={stat.label} className="grid grid-cols-[auto_1fr] items-center gap-4 bg-[#1a1a1a] p-2 pr-4 rounded-xl w-full">
                            {/* Circular Progress for difficulty */}
                            <div className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center -ml-1">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#252525" strokeWidth="3" />
                                <circle 
                                  cx="18" cy="18" r="14" fill="transparent" stroke={stat.color} strokeWidth="3"
                                  strokeDasharray={circleCircumference}
                                  strokeDashoffset={strokeDashoffset}
                                  strokeLinecap="round"
                                  className="transition-all duration-1000 ease-out"
                                />
                              </svg>
                              <span className="absolute text-[8px] md:text-[9px] font-bold" style={{ color: stat.color }}>
                                {percentage}%
                              </span>
                            </div>

                            {/* Text and Linear Bar */}
                            <div className="flex justify-between items-center w-full">
                              <div className="min-w-[44px] sm:min-w-[50px] md:min-w-[60px]">
                                <p className="text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] font-medium uppercase tracking-wider mb-0.5">{stat.label}</p>
                                <p className="text-white font-bold text-xs sm:text-sm">{stat.count}</p>
                              </div>
                              <div className="w-full max-w-[60px] sm:max-w-[80px] md:max-w-[100px] h-1.5 bg-[#252525] rounded-full overflow-hidden ml-2 sm:ml-3">
                                 <div 
                                  className="h-full rounded-full transition-all duration-1000 ease-out" 
                                  style={{ 
                                    width: `${(stat.count / Math.max(...profile.stats.map(s => s.count))) * 100}%`, 
                                    backgroundColor: stat.color 
                                  }} 
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div 
                    className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#151515] border border-[#c9a961]/50 rounded-sm overflow-hidden cursor-pointer" 
                    onClick={() => window.open(profile.link, '_blank')}
                  >
                    <img src={profile.image} alt="Profile Screenshot" className="w-full h-full object-cover object-left-top opacity-90" />
                    <div className="absolute inset-0 bg-black/5 hover:bg-black/10 transition-colors duration-300 pointer-events-none"></div>
                  </div>

                </div>
              </div>

              {/* EXTERNAL VIEW PROFILE LINK - Always visible, doesn't trigger flip */}
              <a 
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center bg-[#151515] border border-gray-800 hover:border-[#c9a961]/50 text-gray-300 hover:text-[#c9a961] px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 shadow-xl"
              >
                <FiExternalLink className="mr-2 text-lg" /> 
                Visit {profile.name} Profile
              </a>
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
