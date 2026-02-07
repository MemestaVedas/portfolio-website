"use client";

import React from 'react';
import { Github, Linkedin, ExternalLink, Terminal, AudioWaveform, Component, Sparkles, Mail, FileDown } from 'lucide-react';
import { Y2KIcons } from './Y2KIcons';

// Static orbital rings for footer background
const OrbitalRingsStatic = () => (
    <svg className="w-full h-full" viewBox="0 0 1000 1000">
        <defs>
            <linearGradient id="ring-gradient-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
        </defs>
        <circle cx="500" cy="500" r="300" fill="none" stroke="url(#ring-gradient-footer)" strokeWidth="1" />
        <circle cx="500" cy="500" r="450" fill="none" stroke="url(#ring-gradient-footer)" strokeWidth="1" />
        <circle cx="500" cy="500" r="600" fill="none" stroke="url(#ring-gradient-footer)" strokeWidth="0.5" />
    </svg>
);

const Footer = () => (
    <footer className="relative bg-electric-primary pt-60 pb-24 overflow-hidden" id="contact">
        {/* Y2K Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
            {/* Orbital rings (static) */}
            <div className="absolute inset-0 opacity-10">
                <OrbitalRingsStatic />
            </div>

            {/* Chrome gradient accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-chrome-gradient opacity-20 blur-3xl rounded-full" />

            {/* Subtle stars */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white-pure rounded-full"
                        style={{
                            left: `${10 + i * 8}%`,
                            top: `${20 + (i * 7) % 60}%`,
                        }}
                    />
                ))}
            </div>

            {/* MEMESTA Big Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span
                    className="text-[23vw] font-black text-white-pure opacity-[0.03] tracking-widest leading-none"
                    style={{ fontFamily: 'var(--font-druk)' }}
                >
                    MEMESTA
                </span>
            </div>
        </div>

        <div className="container mx-auto px-8 relative z-10 max-w-6xl">
            {/* CTA Section */}
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-lime/30 bg-accent-lime/10 mb-6">
                    <Sparkles className="w-4 h-4 text-accent-lime" />
                    <span className="text-sm font-mono text-accent-lime">Available for Hire</span>
                </div>

                <h2 className="font-display text-5xl md:text-7xl text-white-pure mb-6">
                    Let's Build Together
                </h2>

                <p className="text-white-soft/70 text-lg max-w-2xl mx-auto mb-12 font-body">
                    Have a project in mind? Looking for a developer who obsesses over the details? I'd love to hear from you.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    {/* Primary CTA: Email */}
                    <a
                        href="mailto:kushal@example.com"
                        className="group relative px-8 py-4 rounded-2xl overflow-hidden bg-chrome-gradient text-blueprint-base font-mono text-base font-semibold hover:shadow-glow transition-all inline-flex items-center gap-3"
                    >
                        <Mail className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Get In Touch</span>
                    </a>

                    {/* Secondary CTA: Resume */}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group px-8 py-4 rounded-2xl border-2 border-white/20 text-white-pure font-mono text-base hover:border-accent-cyan hover:text-accent-cyan hover:shadow-glow transition-all inline-flex items-center gap-3"
                    >
                        <FileDown className="w-5 h-5" />
                        <span>Download Resume</span>
                    </a>
                </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
                {/* Column 1: Contact */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-chrome-gradient flex items-center justify-center shadow-glow">
                            <span className="text-electric-dark font-display text-sm font-bold">K</span>
                        </div>
                        <h3 className="font-display text-2xl text-white-pure">
                            Links
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <a
                            href="mailto:kushal@example.com"
                            className="group flex items-center gap-3 text-white-soft/80 hover:text-white-pure transition-colors"
                        >
                            <div className="w-5 h-5 text-accent-lime group-hover:translate-x-1 transition-transform">
                                <Y2KIcons.Arrow />
                            </div>
                            <span className="font-mono text-sm">kushal@example.com</span>
                        </a>

                        <a
                            href="https://github.com/kushal"
                            className="group flex items-center gap-3 text-white-soft/80 hover:text-white-pure transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-5 h-5 text-accent-lime" />
                            <span className="font-mono text-sm">GitHub</span>
                        </a>

                        <a
                            href="https://linkedin.com/in/kushal"
                            className="group flex items-center gap-3 text-white-soft/80 hover:text-white-pure transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Linkedin className="w-5 h-5 text-accent-lime" />
                            <span className="font-mono text-sm">LinkedIn</span>
                        </a>
                    </div>
                </div>

                {/* Column 2: Engineering Instincts */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-6 h-6 text-accent-cyan">
                            <Y2KIcons.Orbit />
                        </div>
                        <h3 className="font-display text-2xl text-white-pure">
                            Engineering Instincts From
                        </h3>
                    </div>

                    <div className="space-y-4 text-sm font-body text-white-soft/80">
                        <div className="border-l-2 border-accent-lime/40 pl-4 hover:border-accent-lime transition-colors">
                            <strong className="text-white-pure block mb-1 font-mono flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-accent-lime" />
                                Arch Linux / Hyprland
                            </strong>
                            <p className="leading-relaxed">
                                Daily workflow optimization trains the same instincts I apply to production systems
                            </p>
                        </div>

                        <div className="border-l-2 border-accent-cyan/40 pl-4 hover:border-accent-cyan transition-colors">
                            <strong className="text-white-pure block mb-1 font-mono flex items-center gap-2">
                                <AudioWaveform className="w-4 h-4 text-accent-cyan" />
                                IEM Tuning & Audio Engineering
                            </strong>
                            <p className="leading-relaxed">
                                Critical listening for artifacts → sensitivity to performance jank
                            </p>
                        </div>

                        <div className="border-l-2 border-accent-pink/40 pl-4 hover:border-accent-pink transition-colors">
                            <strong className="text-white-pure block mb-1 font-mono flex items-center gap-2">
                                <Component className="w-4 h-4 text-accent-pink" />
                                Design Systems
                            </strong>
                            <p className="leading-relaxed">
                                Component APIs as contracts, just like type systems prevent runtime errors
                            </p>
                        </div>
                    </div>
                </div>

                {/* Column 3: Colophon */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-6 h-6 text-white-soft/60">
                            <Y2KIcons.Grid />
                        </div>
                        <h3 className="font-display text-2xl text-white-pure">
                            Colophon
                        </h3>
                    </div>

                    <div className="space-y-4 text-sm font-body text-white-soft/80 leading-relaxed">
                        <p>
                            Built with Next.js 14, Framer Motion, and an unhealthy amount of perfectionism.
                            Designed in Figma. Hosted on Vercel.
                        </p>

                        <p>
                            Set in Canela, Söhne, and Departure Mono.
                        </p>

                        <div className="pt-4 border-t border-white-soft/20">
                            <div className="flex items-center gap-2 text-xs text-white-soft/60">
                                <div className="w-4 h-4 text-accent-lime">
                                    <Y2KIcons.Star />
                                </div>
                                <span className="font-mono">
                                    Lighthouse: 98 · Bundle: 78KB · CLS: 0.02
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-white-soft/20 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                    <p className="text-white-soft/60 text-sm font-mono">
                        © 2026 Kushal · Final Year ISE @ DSCE
                    </p>
                </div>

                <div className="flex gap-6 text-sm">
                    <a
                        href="#"
                        className="text-white-soft/60 hover:text-white-pure transition-colors font-mono flex items-center gap-2"
                    >
                        <Y2KIcons.Grid className="w-3 h-3" />
                        Style Guide
                    </a>
                    <a
                        href="#"
                        className="text-white-soft/60 hover:text-white-pure transition-colors font-mono flex items-center gap-2"
                    >
                        <Y2KIcons.Star className="w-3 h-3" />
                        Changelog
                    </a>
                    <a
                        href="https://github.com/kushal/portfolio"
                        className="text-white-soft/60 hover:text-white-pure transition-colors font-mono flex items-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ExternalLink className="w-3 h-3" />
                        Source
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
