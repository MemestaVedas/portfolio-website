"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';

const AboutSection = () => {
    return (
        <section
            className="relative py-24 md:py-28 overflow-hidden bg-blueprint-base"
            id="about"
        >
            <div className="container mx-auto px-6 md:px-8 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="relative"
                >
                    {/* Stacked card glow */}
                    <div className="absolute -inset-2 md:-inset-3 rounded-[2.25rem] bg-black/30 blur-2xl" />
                    <div className="absolute -inset-1 md:-inset-2 rounded-[2rem] bg-electric-primary/10 blur-xl" />

                    {/* Playing card */}
                    <div className="relative rounded-[1.75rem] md:rounded-[2.5rem] border-2 border-black/10 bg-[#F4F1EA] text-[#141414] shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden">
                        {/* Card corners */}
                        <div className="absolute top-6 left-6 flex flex-col items-start gap-2">
                            <span className="font-mono text-xs tracking-[0.3em] uppercase text-black/60">ABOUT</span>
                            <span className="font-display text-3xl md:text-4xl text-black">K</span>
                            <span className="w-6 h-6 rounded-sm bg-accent-cyan" />
                        </div>

                        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/60">PROFILE</span>
                            <span className="font-display text-3xl md:text-4xl text-black">K</span>
                            <span className="w-6 h-6 rounded-sm bg-accent-coral" />
                        </div>

                        {/* Big letter block */}
                        <div className="absolute top-12 right-12 w-[220px] h-[240px] md:w-[320px] md:h-[340px] rounded-3xl bg-accent-cyan/80 -rotate-3 shadow-[0_12px_40px_rgba(0,0,0,0.2)]" />
                        <div className="absolute top-16 right-16 w-[200px] h-[220px] md:w-[300px] md:h-[320px] rounded-3xl bg-white/90 rotate-2 border border-black/10" />
                        <div className="absolute top-16 right-16 w-[200px] h-[220px] md:w-[300px] md:h-[320px] flex items-center justify-center">
                            <span className="font-display text-[160px] md:text-[220px] leading-none text-black/80">K</span>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 px-6 md:px-10 py-10 md:py-14 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/20 bg-black/5 font-mono text-xs uppercase tracking-wider mb-5">
                                Systems-First Product Engineer
                            </div>

                            <h2 className="font-display text-4xl md:text-5xl text-black mb-4">
                                About Me
                            </h2>

                            <div className="space-y-4 text-black/70 font-body text-base md:text-lg leading-relaxed mb-6">
                                <p>
                                    I'm a systems-minded developer who cares about performance, UX clarity, and elegant, maintainable code.
                                </p>
                                <p>
                                    My background spans Rust/C++ to polished React frontends. I believe the best software feels invisible -- fast enough that you forget it's there, intuitive enough that you never read documentation.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-2 text-black/60">
                                    <MapPin className="w-4 h-4 text-electric-primary" />
                                    <span className="font-mono text-sm">Remote / Flexible</span>
                                </div>
                                <div className="flex items-center gap-2 text-black/60">
                                    <Sparkles className="w-4 h-4 text-accent-coral" />
                                    <span className="font-mono text-sm">Open to Opportunities</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom index row */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-black/50">
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                            <span>J</span>
                            <span>Q</span>
                            <span>K</span>
                            <span>A</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
