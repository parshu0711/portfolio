import React from 'react';
import { personalInfo } from '../constants';
import { FiGithub, FiLinkedin, FiCode } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6">
                    PM.
                </span>

                <div className="flex gap-6 mb-8">
                    <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all transform hover:-translate-y-1">
                        <FiGithub size={20} />
                    </a>
                    <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all transform hover:-translate-y-1">
                        <FiLinkedin size={20} />
                    </a>
                    <a href={personalInfo.socials.leetcode} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all transform hover:-translate-y-1">
                        <FiCode size={20} />
                    </a>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                    &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.<br />
                    Built with React & Tailwind CSS.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
