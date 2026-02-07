"use client";

import React from 'react';
import Image from 'next/image';
import { Github } from 'lucide-react';

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

                    {/* RIGHT COLUMN: The Receipts */}
                    <div className="md:w-2/3 space-y-8">
                        {/* Lighthouse Score */}
                        <div className="flex gap-6 items-center p-6 border border-white/10 rounded-xl bg-white/5">
                            <div className="w-16 h-16 rounded-full border-4 border-accent-lime flex items-center justify-center text-accent-lime font-bold text-xl">
                                100
                            </div>
                            <div>
                                <h3 className="text-white-pure font-bold text-lg mb-1">Lighthouse Performance</h3>
                                <p className="text-white-soft/60 text-sm">
                                    0.8s LCP • 0ms Blocking • 0.001 CLS
                                </p>
                            </div>
                        </div>

                        {/* Bundle Analysis */}
                        <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                            <h3 className="text-white-pure font-bold text-lg mb-4">Bundle Analysis</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white-soft">First Load JS</span>
                                    <span className="font-mono text-accent-cyan">78.2 KB (gzip)</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent-cyan w-[20%]" />
                                </div>
                            </div>
                        </div>

                        {/* Flamegraph */}
                        <div className="relative border border-white/10 rounded-xl overflow-hidden h-48 group">
                            <Image
                                src="/meta/flamegraph.png"
                                alt="React profiler flamegraph"
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="px-3 py-1 bg-black/80 rounded text-xs font-mono text-white-soft">
                                    Hover to inspect frame
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MetaSection;
