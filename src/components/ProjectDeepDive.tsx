"use client";

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Y2KIcons } from './Y2KIcons';
import { PlayOnArchitecture } from './ArchitectureDiagram';
import { ProjectBento } from './project/ProjectBento';
import { AnimatePresence } from 'framer-motion';
import SpaceBackdrop from './SpaceBackdrop';


// Types for the project data
export interface ProjectMetric {
    name: string;
    value: string;
    baseline: string;
    delta: string;
    improved: boolean;
}

export interface Tradeoff {
    title: string;
    explanation: string;
}

export interface ProjectData {
    id: string;
    name: string;
    problem: string;
    constraint: string;
    icon?: string;
    metrics: ProjectMetric[];
    tradeoffs: {
        negative: Tradeoff[];
        positive: Tradeoff[];
    };
    ipcStrategy?: string[];     // Added for Bento
    memoryManagement?: string[]; // Added for Bento
    mockups: string[];
    tech: string[];
    techTooltips?: Record<string, string>;
    github: string;
    demo: string;
}

const TechTag = ({ name, tooltip }: { name: string; tooltip?: string }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span
                className="
                    inline-block      
                    px-4 py-2 rounded-full font-mono text-xs
                    bg-chrome-gradient text-electric-dark
                    shadow-md hover:shadow-glow
                    transition-all hover:scale-105 cursor-default
                "
            >
                {name}
            </span>

            <AnimatePresence>
                {tooltip && isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[100] whitespace-nowrap"
                    >
                        <div className="bg-electric-dark border border-electric-glow/40 text-electric-glow px-3 py-1.5 rounded-lg text-[10px] font-mono shadow-glow backdrop-blur-md relative">
                            {tooltip}
                            {/* Tooltip Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-electric-dark" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProjectDeepDive = ({ project }: { project: ProjectData }) => {
    return (
        <section className="relative py-32 bg-blueprint-base overflow-hidden" id={project.id}>
            {/* Y2K Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Soft space backdrop */}
                <SpaceBackdrop className="opacity-50" />

                {/* Gradient accent (top right) */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-primary/10 blur-3xl rounded-full" />
            </div>

            <div className="container mx-auto px-8 relative z-10 max-w-6xl">
                {/* PROJECT HEADER (Y2K styled) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="mb-20"
                >
                    <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                        {/* Y2K icon badge */}
                        <div className="w-16 h-16 rounded-2xl bg-chrome-gradient flex items-center justify-center shadow-glow shrink-0 overflow-hidden relative p-2">
                            {project.icon ? (
                                <Image
                                    src={project.icon}
                                    alt={`${project.name} icon`}
                                    fill
                                    className="object-contain p-2"
                                />
                            ) : (
                                <Y2KIcons.Orbit className="w-8 h-8 text-electric-dark" />
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                                <h2 className="font-display text-5xl text-white-pure">
                                    {project.name}
                                </h2>
                                {/* Active indicator */}
                                <motion.div
                                    className="w-3 h-3 rounded-full bg-accent-lime"
                                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>

                            <p className="text-xl text-white-soft/80 font-body mb-4 max-w-3xl">
                                {project.problem}
                            </p>

                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-4 h-4 text-electric-glow">
                                    <Y2KIcons.Grid />
                                </div>
                                <span className="text-white-soft/60 font-mono">
                                    Constraint: {project.constraint}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* BENTO GRID (The new hotness) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-20"
                >
                    <ProjectBento project={project} />
                </motion.div>

                {/* ARCHITECTURE DIAGRAM (Kept primarily for Play-On if it exists) */}
                {project.id === 'play-on' && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mb-20"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-5 h-5 text-accent-cyan">
                                <Y2KIcons.Orbit />
                            </div>
                            <h3 className="text-sm uppercase tracking-wider text-white-soft/60 font-mono">
                                System Architecture
                            </h3>
                        </div>

                        <div className="glass-card rounded-2xl p-8 border-2 border-white-soft/10 relative overflow-hidden bg-black/40">
                            {/* Chrome accent corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-chrome-gradient opacity-10 blur-2xl" />

                            <div className="relative z-10">
                                <PlayOnArchitecture />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* INTERFACE MOCKUPS (Finally, screenshots) */}
                {project.mockups.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mb-20"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-5 h-5 text-electric-glow">
                                <Y2KIcons.Grid />
                            </div>
                            <h3 className="text-sm uppercase tracking-wider text-white-soft/60 font-mono">
                                Interface Design
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.mockups.map((mockup, i) => (
                                <motion.div
                                    key={i}
                                    className="group relative rounded-xl overflow-hidden border border-white-soft/10 hover:border-electric-glow/40 transition-colors bg-black/50 aspect-video flex items-center justify-center p-4"
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src={mockup}
                                        alt={`${project.name} interface ${i + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    {/* Hover glow overlay */}
                                    <div className="absolute inset-0 bg-electric-glow/0 group-hover:bg-electric-glow/10 transition-colors pointer-events-none" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* TECH STACK (Chrome badges) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-5 h-5 text-white-soft/60">
                            <Y2KIcons.Star />
                        </div>
                        <h3 className="text-sm uppercase tracking-wider text-white-soft/60 font-mono">
                            Built With
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {project.tech.map(tech => (
                            <TechTag
                                key={tech}
                                name={tech}
                                tooltip={project.techTooltips?.[tech]}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* CTA BUTTONS (Y2K styled) */}
                <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              group relative px-6 py-3 rounded-xl overflow-hidden
              bg-white-pure text-blueprint-base font-mono text-sm
              hover:shadow-glow transition-all
              inline-flex items-center gap-2
            "
                    >
                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-glow/30 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                        />
                        <Github className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">View Source</span>
                    </a>

                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              px-6 py-3 rounded-xl
              border-2 border-electric-glow text-electric-glow
              hover:bg-electric-glow/10 hover:shadow-glow
              transition-all font-mono text-sm
              inline-flex items-center gap-2
            "
                    >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectDeepDive;
