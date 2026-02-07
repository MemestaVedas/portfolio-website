"use client";

import React from 'react';
import Image from 'next/image';
import { Github } from 'lucide-react';
import { GalleryCarousel } from './GalleryCarousel';

const MetaSection = () => {
    return (
        <section className="py-24 bg-blueprint-base" id="meta">
            <div className="container mx-auto px-8 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* LEFT COLUMN: Context */}
                    <div className="md:w-1/3">
                        <h2 className="font-display text-4xl text-white-pure mb-6">
                            Performance Receipts
                        </h2>
                        <p className="text-white-soft/70 mb-8 font-body">
                            This portfolio is intentionally over-engineered to demonstrate how I reason about
                            performance, constraints, and tradeoffs.
                        </p>

                        <div className="p-6 border border-blueprint-line/40 rounded-lg bg-blueprint-base/20 backdrop-blur-sm">
                            <h3 className="font-mono text-sm text-accent-lime uppercase tracking-wider mb-4">
                                Source Code
                            </h3>
                            <p className="text-white-soft/60 text-sm mb-6">
                                Everything is open source. No minified secrets.
                            </p>
                            <a
                                href="https://github.com/kushal/portfolio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-white-pure hover:text-accent-cyan transition-colors"
                            >
                                <Github className="w-5 h-5" />
                                <span className="font-mono text-sm">kushal/portfolio</span>
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Project Gallery */}
                    <div className="md:w-2/3">
                        <GalleryCarousel
                            images={[
                                "/projects/play-on-ss.png",
                                "/VIBE-ON!_SS.png",
                                "/meta/flamegraph.png"
                            ]}
                            aspectRatio="video"
                            className="h-full min-h-[400px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MetaSection;
