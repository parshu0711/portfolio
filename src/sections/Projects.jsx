import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/Section';
import { projectsData } from '../constants';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';

const Projects = () => {
    const [filter, setFilter] = useState('All');

    // Extract unique tech tags from all projects
    const allTags = ['All', ...new Set(projectsData.flatMap(p => p.tech))];

    const filteredProjects = projectsData.filter(project => {
        if (filter === 'All') return true;
        return project.tech.includes(filter);
    });

    return (
        <Section id="projects" title="Featured Projects" className="bg-gray-50 dark:bg-gray-900/50">
            {/* Optional Filter (hidden for now to keep simple, uncomment to use)
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {allTags.slice(0, 5).map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filter === tag 
                ? 'bg-blue-600 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div> */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            key={project.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group flex flex-col h-full"
                        >
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-blue-600 dark:text-blue-400">
                                        <FiFolder size={40} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex gap-4">
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                <FiGithub size={22} />
                                            </a>
                                        )}
                                        {project.live && (
                                            <a href={project.live} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                <FiExternalLink size={22} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>

                                <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded mb-4">
                                    {project.date}
                                </span>

                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                    {project.description}
                                </p>
                            </div>

                            <div className="p-6 pt-0 mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map(tech => (
                                        <span key={tech} className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </Section>
    );
};

export default Projects;
