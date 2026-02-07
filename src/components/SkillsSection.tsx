"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Cpu, Code2, FileCode2, Database, Terminal,
    Globe, Palette,
    Server, Layers, Zap, GitBranch
} from 'lucide-react';


// Skill data organized into orbital categories
const skillCategories = {
    core: {
        label: 'Core Stack',
        color: '#C7F000', // accent-lime
        skills: [
            { name: 'Rust', icon: Cpu, reasoning: 'Memory safety eliminates entire classes of production bugs.' },
            { name: 'C++', icon: Code2, reasoning: 'Low-level control for DSP kernels and embedded systems.' },
            { name: 'TypeScript', icon: FileCode2, reasoning: 'Type safety at the UI layer prevents runtime errors.' },
            { name: 'PostgreSQL', icon: Database, reasoning: 'Relational modeling with window functions and CTEs.' },
        ]
    },
    frontend: {
        label: 'Frontend',
        color: '#FF6B9D', // accent-pink
        skills: [
            { name: 'React', icon: Layers, reasoning: 'Component architecture with hooks and context.' },
            { name: 'Next.js', icon: Globe, reasoning: 'SSR, ISR, and App Router for production sites.' },
            { name: 'Tailwind', icon: Palette, reasoning: 'Utility-first CSS with design tokens.' },
            { name: 'Framer Motion', icon: Zap, reasoning: 'Physics-based animations and gestures.' },
        ]
    },
    tools: {
        label: 'Tools & Infrastructure',
        color: '#00D9FF', // accent-cyan
        skills: [
            { name: 'Git', icon: GitBranch, reasoning: 'Trunk-based development, rebasing, bisect.' },
            { name: 'Linux', icon: Terminal, reasoning: 'Arch + Hyprland daily driver. Shell scripting.' },
            { name: 'Docker', icon: Server, reasoning: 'Containerized dev environments and CI/CD.' },
        ]
    }
};

const SkillsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax transforms for background elements
    const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 overflow-hidden bg-[#050508]"
            id="architecture"
        >
            {/* Parallax space stars - NOW STATIC (No Parallax) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 stars-base opacity-80" />
                <div className="absolute inset-0 stars-layer-1" />
                <div className="absolute inset-0 stars-layer-2" />
                <div className="absolute inset-0 stars-layer-3" />
            </div>

            {/* Decorative orbital ring (parallax) */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ rotate: orbitRotate }}
            >
                <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-accent-lime/10 opacity-30" />
                <div className="absolute inset-8 rounded-full border border-accent-cyan/10 opacity-20" />
                <div className="absolute inset-16 rounded-full border border-accent-pink/10 opacity-10" />
            </motion.div>

            <div className="container mx-auto px-8 max-w-6xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="mb-16"
                >
                    <h2 className="font-display text-5xl md:text-6xl text-white-pure mb-4">
                        Tech Galaxy
                    </h2>
                    <p className="text-white-soft/60 max-w-xl font-body text-lg">
                        Engineering instincts shaped by the tools I've internalized.
                    </p>
                </motion.div>

                {/* Skill Categories as Orbital Clusters */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {Object.entries(skillCategories).map(([key, category], categoryIndex) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.15, duration: 0.6 }}
                            className="group"
                        >
                            {/* Category Card */}
                            <div
                                className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/10 transition-all duration-500"
                                style={{
                                    boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.05), 0 0 40px -20px ${category.color}20`
                                }}
                            >
                                {/* Category Label */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: category.color, boxShadow: `0 0 10px ${category.color}` }}
                                    />
                                    <h3 className="text-sm uppercase tracking-wider font-mono" style={{ color: category.color }}>
                                        {category.label}
                                    </h3>
                                </div>

                                {/* Skills List */}
                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.4 }}
                                            className="group/skill"
                                        >
                                            <div className="flex items-center gap-3">
                                                <skill.icon
                                                    className="w-4 h-4 transition-colors duration-300"
                                                    style={{ color: category.color }}
                                                />
                                                <span className="text-white-pure font-mono">{skill.name}</span>
                                            </div>
                                            {/* Reasoning (revealed on hover) */}
                                            <p className="text-xs text-white-soft/50 mt-1 pl-7 line-clamp-2 group-hover/skill:text-white-soft/70 transition-colors">
                                                {skill.reasoning}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default SkillsSection;
