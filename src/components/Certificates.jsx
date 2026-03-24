import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FiExternalLink, FiFileText } from "react-icons/fi";
 
const certificates = [
  {
    title: "NPTEL Certification",
    issuer: "IIT Madras",
    image: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20172545.png",
    link: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20172545.png"
  },
  {
    title: "Coursera Certificate",
    issuer: "Google",
    image: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20173010.png",
    link: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20173010.png"
  },
  {
    title: "Coursera Certificate",
    issuer: "University of Colorado",
    image: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20172847.png",
    link: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20172847.png"
  },
  {
    title: "Coursera Certificate",
    issuer: "IBM",
    image: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20173039.png",
    link: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20173039.png"
  },
  {
    title: "Coursera Certificate",
    issuer: "University of Colorado",
    image: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20173307.png",
    link: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20173307.png"
  },
  {
    title: "Infosys Certificate",
    issuer: "Infosys Springboard",
    image: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20173350.png",
    link: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20173350.png"
  },
  {
    title: "Coursera Certificate",
    issuer: "University of Colorado",
    image: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20172913.png",
    link: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20172913.png"
  },
  {
    title: "Udemy Certificate",
    issuer: "Infosys Springboard",
    image: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20173438.png",
    link: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20173438.png"
  },
  {
    title: "Code-A-Haunt",
    issuer: "Hackathon",
    image: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20174251.png",
    link: "https://ik.imagekit.io/parshu0711/Certificates/Screenshot%202026-03-24%20174251.png"
  }
];
 
// Each card gets its own scroll-driven spread value with staggered input ranges
const Card = ({ cert, index, total, baseAngle, scrollYProgress }) => {
  // Stagger: spread the transition window across 0 → 0.2
  // Card 0 starts first, last card starts latest
  // Each card gets a window of 0.08 within the 0–0.2 range to prevent overlap
  const staggerWindow = 0.08;
  const staggerStep = (0.20 - staggerWindow) / Math.max(total - 1, 1);
  const cardStart = index * staggerStep;
  const cardEnd = cardStart + staggerWindow;
 
  // Per-card spread: 0 (stacked) → 1 (in ring), staggered
  const cardSpread = useTransform(scrollYProgress, [cardStart, cardEnd], [0, 1]);
 
  // Radius grows in sync with each card's own spread
  const cardRadius = useTransform(cardSpread, [0, 1], [0, 350]);
 
  // Ring rotation: starts after all cards are spread (0.2 → 1)
  const rotateY = useTransform(scrollYProgress, [0.2, 1], [0, -360]);
 
  const transform = useTransform(
    [cardSpread, cardRadius, rotateY],
    ([s, r, rot]) => {
      // Circle state position for this card
      const circleAngle = baseAngle * index + rot;
 
      // Stack state: deterministic "messy pile" offsets
      const randomRot = index === 0 ? -2 : ((index * 137.5) % 30) - 15;
      const randomX = index === 0 ? 0 : ((index * 45) % 20) - 10;
      const randomY = index === 0 ? 0 : ((index * 67) % 20) - 10;
      
      // Dynamic Z-order: increased separation during stacking
      // Bottom card has highest Z, top card has lowest Z during stacking
      // Cards move backward as they spread to prevent blocking
      const stackedZ = (total - index) * 8 - (index * 3 * s); // Increased base separation
      const ringZ = r; // In ring mode, use radius for depth
 
      // When spread=0 → stacked. When spread=1 → in ring.
      const currentRotateY = circleAngle * s;
      const currentRotateZ = randomRot * (1 - s);
      const currentTranslateX = randomX * (1 - s);
      const currentTranslateY = randomY * (1 - s);
      const currentTranslateZ = stackedZ * (1 - s) + ringZ * s;
      const currentScale = 1.4 - 0.4 * s;
 
      return `rotateY(${currentRotateY}deg) rotateZ(${currentRotateZ}deg) translate3d(${currentTranslateX}px, ${currentTranslateY}px, ${currentTranslateZ}px) scale(${currentScale})`;
    }
  );
 
  const isPdf = cert.image.toLowerCase().endsWith(".pdf");
 
  return (
    <motion.div
      style={{ transform, transformStyle: "preserve-3d", backfaceVisibility: 'hidden', willChange: 'transform' }}
      onClick={() => window.open(cert.link, "_blank")}
      className="absolute left-0 top-0 w-[220px] h-[240px] bg-[#1e1e1e]/90 backdrop-blur-md border border-[#c9a961]/20 rounded-xl overflow-hidden shadow-2xl cursor-pointer backface-visible"
    >
      <div className="relative h-[155px] overflow-hidden bg-[#2a2a2a] flex items-center justify-center" style={{ backfaceVisibility: 'hidden', perspective: '1000px' }}>
        {isPdf ? (
          <div className="text-center p-4 flex flex-col items-center">
            <FiFileText className="text-[#c9a961] text-5xl mb-2" />
            <span className="text-sm text-gray-400">PDF Document</span>
          </div>
        ) : (
          <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'antialiased', WebkitBackfaceVisibility: 'hidden' }} />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <FiExternalLink className="text-[#c9a961] text-3xl" />
        </div>
      </div>
      <div className="p-4 flex flex-col justify-start h-[80px] bg-[#1e1e1e]">
        <div>
          <h3 className="text-[#e8e8e8] font-bold text-base leading-tight mb-2 line-clamp-2">{cert.title}</h3>
          <p className="text-[#c9a961] text-[10px] font-medium uppercase tracking-wider">{cert.issuer}</p>
        </div>
      </div>
    </motion.div>
  );
};
 
const Certificates = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
 
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
 
  // Title fades out as scroll begins
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  // Hint fades in at the end
  const hintOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
 
  return (
    <section
      id="certificates"
      ref={containerRef}
      className="relative h-[300vh] bg-[#111]"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center perspective-1000 overflow-hidden">
 
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute top-10 md:top-16 text-center z-20 pointer-events-none"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#e8e8e8]">
            My <span className="text-[#c9a961]">Certificates</span>
          </h2>
          <div className="w-24 h-1 bg-[#c9a961] mx-auto rounded-full shadow-[0_0_10px_rgba(201,169,97,0.3)]"></div>
        </motion.div>
 
        <div
          className="relative w-full flex items-center justify-center mt-24 md:mt-32"
          style={{ perspective: "1000px" }}
        >
          {/* The outer wrapper no longer rotates — rotation is baked into each card */}
          <div
            className="relative w-[220px] h-[240px] flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {certificates.map((cert, index) => (
              <Card
                key={index}
                cert={cert}
                index={index}
                total={certificates.length}
                baseAngle={360 / certificates.length}
                scrollYProgress={smoothProgress}
              />
            ))}
          </div>
        </div>
 

      </div>
    </section>
  );
};
 
export default Certificates;