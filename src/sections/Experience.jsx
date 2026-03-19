import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { experienceData, educationData } from '../constants';
import { FiBriefcase, FiBookOpen } from 'react-icons/fi';

const Experience = () => {
    return (
        <Section id="experience" title="Experience & Education">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Experience Column */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                            <FiBriefcase size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h3>
                    </div>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
                        {experienceData.map((exp, idx) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>

                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 ml-4 md:ml-0 hover:shadow-md transition-shadow">
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wide">{exp.date}</span>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{exp.role}</h4>
                                    <p className="text-md font-medium text-gray-600 dark:text-gray-400 mb-3">{exp.company}</p>
                                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc ml-4 marker:text-blue-500">
                                        {exp.points.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Education Column */}
                <div>
                    <div className="flex items-center gap-3 mb-8 mt-12 lg:mt-0">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                            <FiBookOpen size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h3>
                    </div>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
                        {educationData.map((edu, idx) => (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-indigo-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>

                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 ml-4 md:ml-0 hover:shadow-md transition-shadow">
                                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-wide">{edu.date}</span>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{edu.degree}</h4>
                                    <p className="text-md font-medium text-gray-600 dark:text-gray-400">{edu.institution}</p>
                                    <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">{edu.location}</p>
                                    <div className="mt-4 inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs font-bold">
                                        {edu.score}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Experience;
