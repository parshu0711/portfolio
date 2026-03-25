import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiActivity } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

const profiles = [
  {
    name: 'LeetCode',
    username: '@parshu_0711',
    color: '#ffa116',
    icon: <SiLeetcode className="text-3xl text-[#ffa116]" />,
    total: 575,
    calculatedTotal: 575,
    boxes: [
      { label: 'Total Solved', value: '575' },
      { label: 'Contest Rating', value: '1,639' }
    ],
    stats: [
      { label: 'Easy', count: 222, color: '#00b8a3' },
      { label: 'Medium', count: 336, color: '#ffc01e' },
      { label: 'Hard', count: 17, color: '#ef4743' }
    ],
    footerLeft: 'Top 18% • Active Days: 365',
    footerRight: 'Max Streak: 101 Days',
    image: 'https://ik.imagekit.io/parshu0711/coding_profiles/Screenshot%202026-03-24%20023111.png?updatedAt=1774447842773',
    link: 'https://leetcode.com/u/parshu_0711/'
  },
  {
    name: 'Codolio',
    username: '@parshu_0711',
    color: '#3b82f6',
    icon: <FiActivity className="text-3xl text-[#3b82f6]" />,
    total: 679,
    calculatedTotal: 656,
    boxes: [
      { label: 'Total Solved', value: '679' },
      { label: 'Active Days', value: '369' }
    ],
    stats: [
      { label: 'Easy', count: 255, color: '#00b8a3' },
      { label: 'Medium', count: 382, color: '#ffc01e' },
      { label: 'Hard', count: 19, color: '#ef4743' }
    ],
    footerLeft: 'Codolio Sync',
    footerRight: 'Max Streak: 101 Days',
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

                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 [backface-visibility:hidden] bg-[#1e1e1e] border border-gray-800/60 rounded-sm p-4 sm:p-5 md:p-6 flex flex-col justify-between overflow-hidden">

                    {/* Subtle background glow based on profile color */}
                    <div
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-30"
                      style={{ backgroundColor: profile.color }}
                    />

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-[12px] md:rounded-[16px] bg-[#141414] border border-gray-800/80 flex items-center justify-center shadow-inner shrink-0">
                        {profile.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl md:text-2xl font-bold text-[#e8e8e8] tracking-tight truncate">{profile.name}</h3>
                        <p className="text-[#888888] text-xs md:text-sm mt-0.5 font-medium truncate">{profile.username}</p>
                      </div>
                    </div>

                    {/* Two Stats Boxes */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                      {profile.boxes.map((box, idx) => (
                        <div key={idx} className="bg-[#242424] rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-800/40 shadow-sm flex flex-col justify-center">
                          <p className="text-[#a0a0a0] text-[10px] md:text-xs font-medium mb-1 truncate">{box.label}</p>
                          <p className="text-xl md:text-[28px] font-bold text-[#eeb041] leading-tight font-sans tracking-tight">
                            {box.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar Section */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center text-[10px] md:text-xs font-semibold mb-2 md:mb-3">
                        {profile.stats.map(s => (
                          <span key={s.label} style={{ color: s.color }}>
                            {s.label}: {s.count}
                          </span>
                        ))}
                      </div>
                      <div className="w-full h-1.5 md:h-2 rounded-full overflow-hidden flex bg-[#333]">
                        {profile.stats.map(s => {
                          const percentage = (s.count / profile.total) * 100;
                          return (
                            <div
                              key={s.label}
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: s.color
                              }}
                              className="h-full transition-all duration-1000"
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer Section */}
                    <div className="flex justify-between items-center text-[#888888] text-[10px] md:text-xs font-medium mt-auto pt-4 border-t border-gray-800/60">
                      <span>{profile.footerLeft}</span>
                      <span>{profile.footerRight}</span>
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

              {/* EXTERNAL VIEW PROFILE LINK */}
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
