import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { personalInfo } from '../constants';
import { FiCode, FiAward, FiTerminal } from 'react-icons/fi';

const About = () => {
    return (
        <Section id="about" title="About Me">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                    <p>
                        {personalInfo.bio}
                    </p>
                    <p>
                        I am passionate about creating modern, responsive, and performant web applications.
                        With a strong focus on the MERN stack, I enjoy building everything from intuitive frontend interfaces to robust backend architectures.
                    </p>
                    <p>
                        When I'm not coding projects, I spend my time solving algorithmic challenges, participating in competitive programming, and constantly learning new technologies to stay sharp.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                            <FiCode size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Development</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Full-Stack MERN applications with modern UI/UX practices.</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                            <FiTerminal size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Problem Solving</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">650+ problems solved across various standard platforms.</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow sm:col-span-2">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                            <FiAward size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Achievements & Competitions</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Top 18.8% in LeetCode contests. 101-day active streak. Certified in DSA and Social Networks.
                        </p>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default About;
