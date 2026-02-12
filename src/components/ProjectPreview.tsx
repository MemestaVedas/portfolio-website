"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ProjectData } from './ProjectDeepDive';
import { GalleryCarousel } from './GalleryCarousel';
import { TechIcon } from './TechIcon';
import { usePageTransition } from '@/context/PageTransitionContext';

interface ProjectPreviewProps {
    project: ProjectData;
}

export const ProjectPreview = ({ project }: ProjectPreviewProps) => {
    const { transitionTo } = usePageTransition();

    const handleProjectClick = (e: React.MouseEvent) => {
        e.preventDefault();
        transitionTo(`/projects/${project.id}`);
    };

    return (
        <section className="py-24 border-b border-white/5" id={project.id}>
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* LEFT COLUMN: Name & Stack */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full min-h-[400px]">
                        <div>
                            {/* App Icon at the top */}
                            {project.icon && (
                                <div className="relative w-16 h-16 md:w-20 md:h-20 mb-8 opacity-90">
                                    <Image
                                        src={project.icon}
                                        alt={`${project.name} icon`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}

                            <h2 className="text-5xl md:text-7xl font-display text-white-pure leading-tight mb-12">
                                {project.name}
                            </h2>

                            {/* Categorized Tech Stack */}
                            <div className="space-y-10 mb-12">
                                {(project.categorizedStack || []).map((cat) => (
                                    <div key={cat.category}>
                                        <h3 className="text-xs uppercase tracking-[0.2em] text-white-soft/40 font-mono mb-6">
                                            {cat.category} :
                                        </h3>
                                        <div className="space-y-4">
                                            {cat.items.map((item) => (
                                                <div key={item} className="flex items-center gap-4 group/item">
                                                    <div className="w-6 h-6 flex items-center justify-center text-accent-cyan group-hover/item:text-white transition-colors">
                                                        <TechIcon name={item} className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-base font-mono text-white-soft/70 group-hover/item:text-white-pure transition-colors">
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <a
                                href={`/projects/${project.id}`}
                                onClick={handleProjectClick}
                                className="inline-flex items-center gap-2 text-accent-cyan hover:text-white transition-colors group cursor-pointer"
                            >
                                <span className="font-mono text-sm uppercase tracking-wider">View Deep Dive</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Details & Carousel */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <div>
                            <p className="text-xl md:text-2xl text-white-soft font-body leading-relaxed mb-6">
                                {project.problem}
                            </p>
                            <p className="font-mono text-sm text-white-soft/60 mb-8 border-l-2 border-accent-lime pl-4">
                                Constraint: {project.constraint}
                            </p>
                        </div>

                        {/* Carousel Wrapper */}
                        <a href={`/projects/${project.id}`} onClick={handleProjectClick} className="w-full relative group cursor-pointer block">
                            <GalleryCarousel
                                images={project.mockups}
                                aspectRatio="video"
                                className="border-white/10 hover:border-accent-cyan/50 transition-colors"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] z-20 pointer-events-none">
                                <span className="px-6 py-3 bg-white text-black font-bold rounded-full transform scale-90 group-hover:scale-100 transition-transform">
                                    Open Project
                                </span>
                            </div>
                        </a>

                        <div className="block lg:hidden mt-6">
                            <a
                                href={`/projects/${project.id}`}
                                onClick={handleProjectClick}
                                className="inline-flex items-center gap-2 text-accent-cyan hover:text-white transition-colors group cursor-pointer"
                            >
                                <span className="font-mono text-sm uppercase tracking-wider">View Deep Dive</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
