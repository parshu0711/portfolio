import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="py-32 min-h-screen bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center"
    >

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >

        {/* RIGHT: CONTENT */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >

          {/* ABOUT ME HEADING - LETTER BY LETTER */}
          <motion.h1
            className="text-5xl md:text-6xl font-light text-white mb-12"
            viewport={{ once: true, margin: "-100px" }}
          >
            {['A', 'b', 'o', 'u', 't', '                                      '].map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ display: 'inline-block' }}
              >
                {letter}
              </motion.span>
            ))}
            <span className="text-[#c9a961]">
              {['M', 'e'].map((letter, idx) => (
                <motion.span
                  key={idx + 6}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (idx + 6) * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  style={{ display: 'inline-block' }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* DECORATIVE LINE */}
          <motion.div
            className="w-20 h-1 bg-[#c9a961] mb-12 mx-auto"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ transformOrigin: "center" }}
          />


          {/* GREETING */}
          <motion.h2
            className="text-4xl md:text-5xl font-light text-white mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Hi, I'm <span className="text-[#c9a961]">Prashant</span>, a developer focused on seamless web experiences.
          </motion.h2>

          {/* BIO PARAGRAPH */}
          <motion.div
            className="text-white text-lg leading-relaxed mb-12 font-light text-left space-y-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p>
              Most of what I know about development didn’t come from following a straight path — it came from building, failing, and figuring things out along the way.

              I enjoy creating web experiences that are not just functional, but feel smooth and intuitive. Over time, I’ve worked deeply with React, Node.js, and modern web technologies, focusing on performance, clean structure, and thoughtful design.

              For me, development is more than just writing code — it’s about solving problems in a way that’s simple, efficient, and actually useful.

              When I’m not working on projects, I’m usually exploring new tools, experimenting with ideas, or contributing to things that help me grow as a developer.
            </p>
          </motion.div>


          {/* EDUCATION */}
          <motion.div
            className="border-t border-gray-700 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-light text-white mb-6">
              <span className="text-[#c9a961]">Education</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Lovely Professional University */}
              <div className="pb-4 border-b md:border-b-0 md:border-r border-gray-700 md:pr-8">
                <h4 className="text-white font-semibold mb-1">Lovely Professional University</h4>
                <p className="text-gray-400 text-sm mb-1">Bachelor of Technology - Computer Science and Engineering</p>
                <p className="text-gray-500 text-xs mb-1">Punjab</p>
                <p className="text-[#c9a961] text-sm font-light">CGPA: 8.13</p>
              </div>

              {/* Shri Gorakshya Higher Secondary School */}
              <div className="pb-4 border-b md:border-b-0 md:border-r border-gray-700 md:pr-8">
                <h4 className="text-white font-semibold mb-1">Shri Gorakshya Higher Secondary School</h4>
                <p className="text-gray-400 text-sm mb-1">Class XII (PCM)</p>
                <p className="text-gray-500 text-xs mb-1">Chh. Sambhajinagar, Maharashtra</p>
                <p className="text-[#c9a961] text-sm font-light">Percentage: 87.83</p>
              </div>

              {/* Jawahar Navodaya Vidyalaya */}
              <div>
                <h4 className="text-white font-semibold mb-1">Jawahar Navodaya Vidyalaya</h4>
                <p className="text-gray-400 text-sm mb-1">Matriculation (Class X)</p>
                <p className="text-gray-500 text-xs mb-1">Kannad, Chh. Sambhajinagar</p>
                <p className="text-[#c9a961] text-sm font-light">Percentage: 90.20</p>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
};

export default About;
