import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { skillsData } from '../constants';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Skills = () => {
    return (
        <Section id="skills" title="Skills & Technologies" className="bg-gray-50 dark:bg-gray-900/50">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {skillsData.map((category, idx) => (
                    <motion.div
                        key={category.category}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                            {category.category}
                        </h3>
                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="flex flex-wrap gap-3"
                        >
                            {category.items.map((skill) => (
                                <motion.span
                                    key={skill}
                                    variants={item}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Skills;
