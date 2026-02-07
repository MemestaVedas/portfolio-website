"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Cpu, Code2, FileCode2, Database, Terminal,
    AudioWaveform, Component, Globe, Palette,
    Server, Layers, Zap, GitBranch
} from 'lucide-react';
import SpaceBackdrop from './SpaceBackdrop';

// Skill data organized into orbital categories
const skillCategories = {
    core: {
        label: 'Core Stack',
        color: '#C7F000', // accent-lime
        skills: [
            { name: 'Rust', years: 2, icon: Cpu, reasoning: 'Memory safety eliminates entire classes of production bugs.' },
            { name: 'C++', years: 3, icon: Code2, reasoning: 'Low-level control for DSP kernels and embedded systems.' },
            { name: 'TypeScript', years: 4, icon: FileCode2, reasoning: 'Type safety at the UI layer prevents runtime errors.' },
            { name: 'PostgreSQL', years: 2, icon: Database, reasoning: 'Relational modeling with window functions and CTEs.' },
        ]
    },
    frontend: {
        label: 'Frontend',
        color: '#FF6B9D', // accent-pink
        skills: [
            { name: 'React', years: 4, icon: Layers, reasoning: 'Component architecture with hooks and context.' },
            { name: 'Next.js', years: 3, icon: Globe, reasoning: 'SSR, ISR, and App Router for production sites.' },
            { name: 'Tailwind', years: 3, icon: Palette, reasoning: 'Utility-first CSS with design tokens.' },
            { name: 'Framer Motion', years: 2, icon: Zap, reasoning: 'Physics-based animations and gestures.' },
        ]
    },
    tools: {
        label: 'Tools & Infrastructure',
        color: '#00D9FF', // accent-cyan
        skills: [
            { name: 'Git', years: 5, icon: GitBranch, reasoning: 'Trunk-based development, rebasing, bisect.' },
            { name: 'Linux', years: 4, icon: Terminal, reasoning: 'Arch + Hyprland daily driver. Shell scripting.' },
            { name: 'Docker', years: 2, icon: Server, reasoning: 'Containerized dev environments and CI/CD.' },
        ]
    }
};

const craftSignals = [
    { activity: 'Arch Linux / Hyprland', icon: Terminal, reasoning: 'Daily workflow optimization trains production instincts.' },
    { activity: 'IEM Tuning & Audio', icon: AudioWaveform, reasoning: '1ms delay is audible; 16ms frame drop is visible.' },
    { activity: 'Design Systems', icon: Component, reasoning: 'Component APIs are contracts. Tokens prevent drift.' },
];

const SkillsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax transforms for background elements
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
            id="architecture"
            style={{
                background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)'
            }}
        >
            {/* Parallax space backdrop */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: bgY }}
            >
                <SpaceBackdrop className="opacity-60" />
            </motion.div>

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
                                                <span className="text-xs text-white-soft/30 ml-auto font-mono">
                                                    {skill.years}y
                                                </span>
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

                {/* Engineering Instincts Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-electric-primary/30" />
                        <h3 className="text-sm uppercase tracking-wider text-electric-primary font-mono">
                            Instincts From
                        </h3>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-electric-primary/30" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {craftSignals.map((signal, i) => (
                            <motion.div
                                key={signal.activity}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                className="flex items-start gap-4 p-4 rounded-xl border border-electric-primary/20 bg-electric-primary/5 hover:bg-electric-primary/10 transition-colors"
                            >
                                <signal.icon className="w-5 h-5 text-electric-primary shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-white-pure font-mono text-sm mb-1">{signal.activity}</h4>
                                    <p className="text-xs text-white-soft/60 leading-relaxed">{signal.reasoning}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;
