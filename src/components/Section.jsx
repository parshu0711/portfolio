import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ id, title, children, className = '' }) => {
    return (
        <section id={id} className={`py-20 md:py-32 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {title && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {title}
                        </h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                    </motion.div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
