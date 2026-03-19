import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { personalInfo } from '../constants';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const Contact = () => {
    return (
        <Section id="contact" title="Get In Touch">
            <div className="grid lg:grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Let's talk about everything!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Feel free to reach out for collaborations, opportunities, or just a friendly chat. I'll try my best to get back to you!
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center shrink-0">
                                <FiMail size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Email</p>
                                <a href={`mailto:${personalInfo.email}`} className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    {personalInfo.email}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center shrink-0">
                                <FiPhone size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Phone</p>
                                <a href={`tel:${personalInfo.phone}`} className="text-lg font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    {personalInfo.phone}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center shrink-0">
                                <FiMapPin size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Location</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {personalInfo.location}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <form className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-shadow"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-shadow"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                placeholder="How can I help you?"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-shadow"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                placeholder="Hello Prashant, I would like to..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-shadow resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            Send Message <FiSend />
                        </button>
                    </form>
                </motion.div>
            </div>
        </Section>
    );
};

export default Contact;
