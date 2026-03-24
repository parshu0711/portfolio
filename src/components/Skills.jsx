import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaNodeJs, FaJava, FaReact, FaHtml5, FaGithub, FaPython, FaDatabase } from "react-icons/fa";
import { SiMongodb, SiJavascript, SiExpress, SiRedux, SiTypescript, SiCplusplus, SiTailwindcss, SiNextdotjs, SiThreedotjs } from "react-icons/si";

const skills = [
  // Core / Inner Circle (6 items)
  { name: 'MongoDB', category: 'Database', icon: SiMongodb },
  { name: 'Node.js', category: 'Backend', icon: FaNodeJs },
  { name: 'Java', category: 'Language', icon: FaJava },
  { name: 'JavaScript', category: 'Language', icon: SiJavascript },
  { name: 'React', category: 'Frontend', icon: FaReact },
  { name: 'HTML/CSS', category: 'Frontend', icon: FaHtml5 },
  
  // Outer Circle (10 items)
  { name: 'Git/GitHub', category: 'Tools', icon: FaGithub },
  { name: 'SQL', category: 'Database', icon: FaDatabase },
  { name: 'Express', category: 'Backend', icon: SiExpress },
  { name: 'Redux', category: 'State', icon: SiRedux },
  { name: 'Python', category: 'Language', icon: FaPython },
  { name: 'TypeScript', category: 'Language', icon: SiTypescript },
  { name: 'C++', category: 'Language', icon: SiCplusplus },
  { name: 'Tailwind', category: 'Frontend', icon: SiTailwindcss },
  { name: 'Next.js', category: 'Frontend', icon: SiNextdotjs },
  { name: 'Three.js', category: 'Library', icon: SiThreedotjs },
];

const Hexagon = ({ size = "w-32 h-36", color = "#c9a961", children, className = "" }) => (
  <div className={`relative flex items-center justify-center ${size} ${className}`}
       style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
       
       {/* Background */}
       <div className="absolute inset-[1px] bg-[#1a1a1a] flex flex-col items-center justify-center z-10" 
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
           {children}
       </div>
       
       {/* Border Gradient */}
       <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#c9a961] to-[#9b8b7e] opacity-50" />
  </div>
);

const ConnectionLine = ({ x2, y2, scrollYProgress }) => {
    // Determine drawing progress
    const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
    
    return (
        <svg className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible">
             <motion.line 
                x1="400" y1="400"
                x2={400 + x2}
                y2={400 + y2}
                stroke="#c9a961" 
                strokeWidth="2" 
                strokeDasharray="6 6"
                strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                style={{ pathLength: draw }}
            />
        </svg>
    )
}


const SkillNode = ({ skill, index, total, layer, scrollYProgress }) => {
    const isInner = layer === 'inner';
    const radius = isInner ? 160 : 280; // Radius in pixels
    const itemsInLayer = isInner ? 6 : 10;
    const angleOffset = isInner ? 30 : 15; // Offset to stagger
    const angleDeg = (index * (360 / itemsInLayer)) + angleOffset;
    const angleRad = angleDeg * (Math.PI / 180);

    const x = Math.cos(angleRad) * radius;
    const y = Math.sin(angleRad) * radius;

    // Movement
    const xPos = useTransform(scrollYProgress, [0, 1], [0, x]);
    const yPos = useTransform(scrollYProgress, [0, 1], [0, y]);
    
    // Scale / Opacity
    const scale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const Icon = skill.icon;

    return (
        <>
            {/* Line starts from center (0,0 relative) to node position */}
            {/* We pass the FINAL x/y to the line component to handle drawing */}
            <ConnectionLine x2={x} y2={y} scrollYProgress={scrollYProgress} />

            <motion.div
                style={{ x: xPos, y: yPos, scale, opacity }}
                className="absolute flex items-center justify-center z-10"
            >
                <Hexagon size={isInner ? "w-24 h-28 md:w-28 md:h-32" : "w-20 h-24 md:w-24 md:h-28"}>
                    <div className="text-center p-1 flex flex-col items-center justify-center">
                        {Icon && <Icon className={`mb-1 md:mb-1.5 ${isInner ? "text-2xl md:text-3xl" : "text-lg md:text-xl"} text-[#c9a961]`} />}
                        <span className={`block font-bold ${isInner ? "text-xs md:text-sm text-[#e8e8e8]" : "text-[10px] md:text-xs text-gray-300"}`}>
                            {skill.name}
                        </span>
                        <span className="block text-[8px] text-[#c9a961] uppercase tracking-widest mt-0.5">
                            {skill.category}
                        </span>
                    </div>
                </Hexagon>
            </motion.div>
        </>
    );
};

const Skills = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const innerSkills = skills.slice(0, 6);
    const outerSkills = skills.slice(6, 16);

    const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <section id="skills" ref={containerRef} className="relative h-[300vh] bg-[#1a1a1a]">
            <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden perspective-1000">
                
                {/* Dark Radial Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2a2a2a_0%,_#111_100%)] -z-20" />
                
                {/* Central "Mind Map" Core */}
                <motion.div 
                    style={{ scale: useTransform(scrollYProgress, [0, 0.3], [1.3, 1]) }}
                    className="relative z-20 flex flex-col items-center justify-center"
                >
                    <motion.h2 
                        style={{ opacity: headingOpacity }}
                        className="absolute -top-16 md:-top-20 text-3xl md:text-5xl font-bold text-[#e8e8e8] tracking-widest uppercase font-serif"
                    >
                        Skills
                    </motion.h2>
                    <div className="w-32 h-32 md:w-48 md:h-48 bg-[#212121] rounded-3xl border-4 border-[#c9a961] shadow-[0_0_60px_rgba(201,169,97,0.15)] flex flex-col items-center justify-center text-center p-4 relative">
                        {/* Connecting knobs visual */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#c9a961] rounded-full" />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#c9a961] rounded-full" />
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#c9a961] rounded-full" />
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#c9a961] rounded-full" />
                        
                        <h2 className="text-xl md:text-3xl font-bold text-[#e8e8e8] font-serif">
                            Technology<br /><span className="text-[#c9a961]">Stack</span>
                        </h2>
                        <div className="w-8 h-1 bg-[#c9a961]/50 rounded-full mt-2" />
                    </div>
                </motion.div>

                {/* Nodes Container */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     {innerSkills.map((skill, index) => (
                        <SkillNode 
                            key={`inner-${index}`} 
                            skill={skill} 
                            index={index} 
                            layer="inner"
                            scrollYProgress={scrollYProgress}
                        />
                     ))}
                     {outerSkills.map((skill, index) => (
                        <SkillNode 
                            key={`outer-${index}`} 
                            skill={skill} 
                            index={index} 
                            layer="outer"
                            scrollYProgress={scrollYProgress}
                        />
                     ))}
                </div>

            </div>
        </section>
    );
};

export default Skills;
