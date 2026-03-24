import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

const internships = [
  {
    role: 'Frontend Developer Intern',
    company: 'Learn Comet Edu',
    link: 'https://www.learncometedu.com/',
    duration: 'June 2025 - Sep 2025',
    description: [
      'Developed responsive and animated user interfaces for an EdTech mentorship platform using Next.js and Tailwind CSS.',
      'Built interactive components including mentor-spotlight sections to improve user engagement and overall UI experience.'
      
    ],
  },
  {
    role: 'Web Design Intern',
    company: 'AT Production Pvt. Ltd.',
    link: 'https://www.atproduction.net/',
    duration: 'Oct 2025 - Feb 2026',
    description: [
      'Contributed to the development of a production web platform and internal CRM by implementing features across frontend and backend systems.',
      'Improved system performance and security by optimizing rendering processes and enhancing the overall application architecture.'
    ],
  },
];

const InternshipCard = ({ internship, index, scrollYProgress, totalItems }) => {
    // Determine lighting based on scroll position - One at a time logic
    const segment = 1 / totalItems;
    const start = index * segment;
    const end = (index + 1) * segment;
    
    // Define a range where this specific card is active.
    // [start, start + fade, end - fade, end] -> [0, 1, 1, 0]
    // using a small buffer to transition smoothly
    const buffer = segment * 0.2; 

    // Ensure strictly ascending for useTransform
    const safeStart = start;
    const safefadeIn = start + buffer;
    const safeFadeOut = end - buffer;
    const safeEnd = end;

    const isActive = useTransform(scrollYProgress, 
        [safeStart, safefadeIn, safeFadeOut, safeEnd], 
        [0, 1, 1, 0]
    );

    // Map that 0-1 value to specific styles
    const opacity = useTransform(isActive, [0, 1], [0.3, 1]); // Dim to bright
    const scale = useTransform(isActive, [0, 1], [0.95, 1.05]);
    const borderOpacity = useTransform(isActive, [0, 1], [0.1, 0.8]);
    const glow = useTransform(isActive, [0, 1], ["0px 0px 0px rgba(201,169,97,0)", "0px 0px 40px rgba(201,169,97,0.5)"]);
    const bgGlow = useTransform(isActive, [0, 1], ["rgba(201,169,97,0)", "rgba(201,169,97,0.05)"]);
    const iconColor = useTransform(isActive, [0, 1], ["#555", "#c9a961"]);
    const iconBorder = useTransform(isActive, [0, 1], ["#333", "#c9a961"]);
    const iconGlow = useTransform(isActive, [0, 1], ["0px 0px 0px rgba(201,169,97,0)", "0px 0px 20px rgba(201,169,97,0.8)"]);

    return (
          <div
            className={`mb-20 flex flex-col md:flex-row items-center justify-between w-full relative z-10 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="hidden md:block w-5/12"></div>

             {/* ICON */}
            <motion.div 
                style={{ 
                    borderColor: iconBorder, 
                    boxShadow: iconGlow,
                    scale: scale 
                }}
                className="z-20 flex items-center justify-center w-12 h-12 bg-[#242424] rounded-full border-2 absolute left-0 md:left-1/2 transform md:-translate-x-1/2"
            >
              <motion.div style={{ color: iconColor }}>
                 <FaBriefcase className="text-lg" />
              </motion.div>
            </motion.div>

            {/* CARD */}
            <motion.div
              style={{ 
                  opacity: opacity,
                  x: 0 // Reset x for simple fade in place, or animate in
              }}
              // Retain initial entrance animation if desired, separate from scroll highlight
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-5/12 pl-12 md:pl-0"
            >
              <motion.div 
                style={{ 
                    borderColor: `rgba(201, 169, 97, ${borderOpacity})`, 
                    background: bgGlow,
                    boxShadow: glow 
                }}
                className="glass p-6 rounded-2xl border border-[#c9a961]/10 transition-all duration-300"
              >
                <span className="text-sm font-semibold text-[#c9a961] mb-2 inline-block px-3 py-1 bg-[#c9a961]/10 rounded-full">
                  {internship.duration}
                </span>
                <h3 className="text-2xl font-bold mb-1 text-[#e8e8e8]">{internship.role}</h3>
                <h4 className="text-lg text-[#a8a8b8] mb-4">
                  <a 
                    href={internship.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#c9a961] transition-colors underline decoration-[#c9a961]/50 hover:decoration-[#c9a961]"
                  >
                    {internship.company}
                  </a>
                </h4>
                <ul className="list-disc list-inside space-y-2 text-[#a8a8b8]">
                  {internship.description.map((item, i) => (
                    <li key={i} className="text-sm leading-relaxed">{item}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
    );
}

const Internship = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 40%"]
  });

  // Smoother, longer wave
  const wavyPath = "M 50 0 " + Array.from({ length: 10 }).map((_, i) => {
    const y = i * 200;
    return `Q 70 ${y + 50}, 50 ${y + 100} Q 30 ${y + 150}, 50 ${y + 200}`;
  }).join(' ');

  return (
  <section id="internship" className="py-24 relative z-10">
    <div className="container mx-auto px-6 md:px-12">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-[#e8e8e8]"
        >
          My <span className="text-gradient">Internships</span>
        </motion.h2>
        <div className="w-24 h-1 bg-[#c9a961] mx-auto rounded-full shadow-[0_0_10px_rgba(201,169,97,0.3)]"></div>
      </div>

      <div ref={ref} className="max-w-4xl mx-auto relative pt-10 pb-10">
        
        {/* Animated Curly Line */}
        <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[100px] -translate-x-[50px] md:-translate-x-1/2 h-full z-0 overflow-hidden pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 100 2400" preserveAspectRatio="none"> 
                {/* Visible "Black" (Dark Grey) track before lighting up */}
                <path d={wavyPath} fill="none" stroke="#2d2d2d" strokeWidth="2" />
                
                <motion.path 
                    d={wavyPath} 
                    fill="none" 
                    stroke="#c9a961" 
                    strokeWidth="3" 
                    style={{ pathLength: scrollYProgress }} 
                />
             </svg>
        </div>

        {internships.map((internship, index) => (
             <InternshipCard 
                key={index} 
                internship={internship} 
                index={index} 
                scrollYProgress={scrollYProgress}
                totalItems={internships.length}
             />
        ))}

      </div>
    </div>
  </section>
  );
};

export default Internship;
