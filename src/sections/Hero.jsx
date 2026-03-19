import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiFileText } from 'react-icons/fi';
import { personalInfo } from '../constants';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center pt-20 overflow-hidden relative">
            {/* Background gradients */}
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium">
                            Hello, I'm
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            {personalInfo.name}
                        </h1>
                        <p className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300">
                            {personalInfo.role}
                        </p>
                    </div>

                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                        I build scalable web applications and solve complex problems.
                        Passionate about modern UI/UX and crafting efficient backend systems.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <a
                            href="#projects"
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                        >
                            View Projects <FiArrowRight />
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-full font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
                        >
                            Contact Me <FiFileText />
                        </a>
                    </div>

                    <div className="flex gap-6 pt-8">
                        {Object.entries(personalInfo.socials).map(([key, url]) => (
                            <a
                                key={key}
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase text-sm font-semibold tracking-wider"
                            >
                                {key}
                            </a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative hidden md:block"
                >
                    {/* Decorative Elements */}
                    <div className="aspect-square relative flex justify-center items-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full opacity-20 blur-2xl"></div>
                        <div className="w-[80%] h-[80%] bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full relative z-10 flex items-center justify-center overflow-hidden border-8 border-white/10 dark:border-gray-900/50 shadow-2xl">
                            <span className="text-9xl font-bold text-white/50">PM</span>
                        </div>

                        {/* Floating badges */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-10 z-20 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">1.6k</div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Contest<br />Rating</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-10 left-5 z-20 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">500+</div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">DSA<br />Problems</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
