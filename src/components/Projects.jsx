import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'AT Production – Azure-Deployed Full-Stack CMS Platform',
    description: 'A production-ready full-stack CMS platform designed to manage dynamic content, blogs, and user interactions with high performance and scalability. Features secure authentication, role-based access, and a responsive UI with seamless deployment on Azure.',
    image: 'https://ik.imagekit.io/vzxwc5boa/Screenshot%202026-03-21%20183026.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Azure', 'JWT Auth'],
    live: 'https://www.atproduction.net/',
  },
  {
    title: 'AT Production – CRM & Workforce Management Platform',
    description: 'A scalable CRM and workforce management system with real-time data handling, secure authentication, and Azure deployment for managing customers, employees, and operations.',
    image: 'https://ik.imagekit.io/vzxwc5boa/Screenshot%202026-03-21%20183048.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Azure', 'JWT Auth'],
    live: 'https://crm.atproduction.net/dashboard',
  },
  {
    title: 'LearnComet Edu Platform',
    description: 'Built responsive and animated UI components for an EdTech mentorship platform using Next.js and Tailwind, enhancing user engagement and performance.',
    image: 'https://ik.imagekit.io/vzxwc5boa/Screenshot%202026-03-21%20184759.png',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript', 'Responsive Design'],
    live: 'https://www.learncometedu.com/',
  },
];

function seededRandom(seed) {
  let s = seed + 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Approximate tag pixel width based on text length
function tagWidth(text) {
  return text.length * 7.5 + 24; // px-3 padding both sides + chars
}

const TAG_H = 30;      // tag height px
const TAG_GAP = 6;     // minimum horizontal gap between tags
const FLOOR_H = 48;    // total floor container height — compact

// Resolve tag X positions so none overlap
// All tags want to land near center, but we push them apart if they collide
function resolvePositions(tags, containerWidth) {
  const rng = seededRandom(tags.length * 17 + 3);
  const CENTER = containerWidth / 2;

  // Give each tag an initial desired X (center ± small jitter)
  let items = tags.map((tag) => {
    const w = tagWidth(tag);
    const jitter = (rng() - 0.5) * 40; // ±20px from center
    return {
      tag,
      w,
      x: CENTER + jitter - w / 2, // left edge
      rotate: (rng() - 0.5) * 18, // mild tilt ±9°
      delay: tags.indexOf(tag) * 0.07 + rng() * 0.03,
    };
  });

  // Sort by desired X so collision resolution is stable
  items.sort((a, b) => a.x - b.x);

  // Push apart: iterate until no overlaps (max 10 passes)
  for (let pass = 0; pass < 10; pass++) {
    let changed = false;
    for (let i = 0; i < items.length - 1; i++) {
      const a = items[i];
      const b = items[i + 1];
      const overlap = (a.x + a.w + TAG_GAP) - b.x;
      if (overlap > 0) {
        // Push them apart equally from their midpoint
        a.x -= overlap / 2;
        b.x += overlap / 2;
        changed = true;
      }
    }
    if (!changed) break;
  }

  // Clamp to container bounds
  items.forEach((item) => {
    item.x = Math.max(4, Math.min(containerWidth - item.w - 4, item.x));
  });

  return items;
}

const FallingTagsFloor = ({ tech, isVisible, containerWidth }) => {
  const items = resolvePositions(tech, containerWidth);

  return (
    // overflow:visible so tags animate in from above
    <div className="relative w-full" style={{ height: FLOOR_H, overflow: 'visible' }}>
      {isVisible && items.map(({ tag, x, w, rotate, delay }, idx) => (
        <motion.div
          key={tag}
          className="absolute"
          style={{
            left: x,
            width: w,
            // Sit at bottom of floor zone
            bottom: 6,
            zIndex: 20 + idx,
            transformOrigin: '50% 100%',
          }}
          initial={{ y: -340, rotate: rotate * 3, opacity: 1 }}
          animate={{
            // Phase 1: fall → overshoot → bounce → settle
            y: [null, 12, -5, 2, 0],
            // Phase 2: rotation snaps to mild tilt on impact
            rotate: [null, rotate * 1.1, rotate * 0.9, rotate],
          }}
          transition={{
            delay,
            duration: 0.52,
            times: [0, 0.63, 0.79, 0.91, 1],
            ease: 'easeIn',
          }}
        >
          {/* impact dust */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: -2,
              left: '10%',
              width: '80%',
              height: 4,
              borderRadius: 9999,
              background: 'rgba(201,169,97,0.2)',
              filter: 'blur(3px)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1.6, 0], opacity: [0, 0.8, 0] }}
            transition={{ delay: delay + 0.32, duration: 0.34 }}
          />

          <span
            className="flex items-center justify-center h-[30px] rounded-lg text-xs font-bold whitespace-nowrap select-none w-full"
            style={{
              background: 'rgba(8,8,8,0.96)',
              border: '1px solid rgba(201,169,97,0.38)',
              color: '#c9a961',
              letterSpacing: '0.04em',
              boxShadow: '0 4px 16px rgba(0,0,0,0.75), 0 1px 0 rgba(201,169,97,0.07) inset',
            }}
          >
            {tag}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

// Measure the right panel width so we can resolve tag positions accurately
const RightPanel = ({ image, title, tech, projectIndex, isVisible, live }) => {
  const panelRef = useRef(null);
  const [width, setWidth] = useState(400);

  useEffect(() => {
    if (!panelRef.current) return;
    const obs = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    obs.observe(panelRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={panelRef} className="w-full md:w-[58%] flex flex-col p-6 md:p-8 gap-3">
      {/* Clean image with hover overlay */}
      <div
        className="w-full rounded-2xl overflow-hidden flex-shrink-0 relative group cursor-pointer"
        style={{
          aspectRatio: '16/9',
          border: '1px solid rgba(201,169,97,0.15)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
        }}
      >
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <a 
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#c9a961] hover:bg-[#b09252] text-[#1a1a1a] text-sm font-bold transition-all shadow-[0_4px_15px_rgba(201,169,97,0.3)] hover:shadow-[0_4px_25px_rgba(201,169,97,0.5)]"
          >
            <FaExternalLinkAlt className="text-base" /> Visit Site
          </a>
        </div>
      </div>

      {/* Floor — compact, no label */}
      <div
        className="relative w-full rounded-xl"
        style={{
          background: 'rgba(0,0,0,0.25)',
          border: '1px solid rgba(201,169,97,0.07)',
          height: FLOOR_H + 12,
          overflow: 'visible',
        }}
      >
        {/* subtle floor line */}
        <div
          className="absolute bottom-[10px] left-3 right-3 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,97,0.2), transparent)' }}
        />
        <FallingTagsFloor
          tech={tech}
          isVisible={isVisible}
          containerWidth={width - 24} // account for floor padding
        />
      </div>
    </div>
  );
};

const Card = ({ i, title, description, image, live, tech, progress, range, targetScale }) => {
  const container = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: '-12% 0px -12% 0px' });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (isInView) {
      setTriggered(false);
      const t = setTimeout(() => setTriggered(true), 100);
      return () => clearTimeout(t);
    } else {
      setTriggered(false);
    }
  }, [isInView]);

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 pt-16">
      <motion.div
        ref={cardRef}
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="relative w-full max-w-[1020px] rounded-3xl overflow-visible origin-top"
      >
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #1c1c1c 0%, #181818 100%)',
            border: '1px solid rgba(201,169,97,0.18)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,169,97,0.06)',
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row w-full">
          {/* Left */}
          <div className="w-full md:w-[42%] flex flex-col p-8 md:p-10">
            <div
              className="text-7xl font-black mb-2 select-none leading-none"
              style={{ color: 'rgba(201,169,97,0.07)', fontFamily: 'Georgia, serif' }}
            >
              0{i + 1}
            </div>
            <h3
              className="text-xl md:text-2xl font-bold text-[#e8e8e8] mb-3 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {title}
            </h3>
            <p className="text-[#7a7a8a] text-s leading-relaxed flex-1">{description}</p>
            <div className="mt-8">
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, #c9a961, #a8883f)',
                  color: '#111',
                  boxShadow: '0 4px 20px rgba(201,169,97,0.28)',
                }}
              >
                <FaExternalLinkAlt className="text-xs" />
                Live Demo
              </a>
            </div>
          </div>

          {/* Divider */}
          <div
            className="hidden md:block w-px my-8 flex-shrink-0"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,169,97,0.18), transparent)' }}
          />

          {/* Right — image + tag floor */}
          <RightPanel
            image={image}
            title={title}
            tech={tech}
            projectIndex={i}
            isVisible={triggered}
            live={live}
          />
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="projects" ref={container} className="relative z-10 bg-[#111]">      <div className="pt-24 pb-8 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-[#e8e8e8]"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Featured <span style={{ color: '#c9a961' }}>Projects</span>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-1 mx-auto rounded-full"
          style={{ background: '#c9a961', boxShadow: '0 0 10px rgba(201,169,97,0.3)' }}
        />
      </div>

      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <Card
            key={i}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
};

export default Projects;