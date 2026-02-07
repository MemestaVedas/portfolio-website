"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Code, Cpu, Zap, RefreshCw } from 'lucide-react';
import { useKonamiCode } from '@/hooks/useKonamiCode';

// Card Data Types
interface CardData {
    id: string;
    rank: string;
    title: string;
    subtitle: string;
    accentColor: string;
    content: React.ReactNode;
}

const AboutSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const konamiActive = useKonamiCode();

    // Card Definitions
    const cards: CardData[] = [
        {
            id: 'king-intro',
            rank: 'K',
            title: 'About Me',
            subtitle: 'PROFILE',
            accentColor: 'bg-accent-cyan',
            content: (
                <div className="relative z-10 px-6 md:px-10 py-10 md:py-14 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/20 bg-black/5 font-mono text-xs uppercase tracking-wider mb-5">
                        Systems-First Product Engineer
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-black mb-4">
                        Kushal
                    </h2>
                    <div className="space-y-4 text-black/70 font-body text-base md:text-lg leading-relaxed mb-6">
                        <p>
                            I'm a systems-minded developer who cares about performance, UX clarity, and elegant, maintainable code.
                        </p>
                        <p>
                            My background spans Rust/C++ to polished React frontends. I believe the best software feels invisible -- fast enough that you forget it's there.
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
            )
        },
        {
            id: 'jack-stats',
            rank: 'J',
            title: 'The Builder',
            subtitle: 'STATS',
            accentColor: 'bg-accent-orange',
            content: (
                <div className="relative z-10 px-6 md:px-10 py-10 md:py-14 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/20 bg-black/5 font-mono text-xs uppercase tracking-wider mb-5">
                        Technical Arsenal
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-black mb-6">
                        System Stats
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-black/5 border border-black/10">
                            <div className="flex items-center gap-2 text-black/50 mb-2">
                                <Code size={16} />
                                <span className="font-mono text-xs uppercase">Core Stack</span>
                            </div>
                            <div className="font-display text-xl text-black">React • Rust • TS</div>
                        </div>
                        <div className="p-4 rounded-xl bg-black/5 border border-black/10">
                            <div className="flex items-center gap-2 text-black/50 mb-2">
                                <Cpu size={16} />
                                <span className="font-mono text-xs uppercase">Architecture</span>
                            </div>
                            <div className="font-display text-xl text-black">Systems Design</div>
                        </div>
                        <div className="col-span-2 p-4 rounded-xl bg-black/5 border border-black/10 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-black/50 mb-1">
                                    <Zap size={16} />
                                    <span className="font-mono text-xs uppercase">Shipping Speed</span>
                                </div>
                                <div className="w-48 h-2 bg-black/10 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-accent-orange w-[95%]" />
                                </div>
                            </div>
                            <span className="font-mono text-xl text-black font-bold">95/100</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'ace-wild',
            rank: 'A',
            title: 'Wildcard',
            subtitle: 'SECRET',
            accentColor: 'bg-accent-magenta',
            content: (
                <div className="relative z-10 px-6 md:px-10 py-10 md:py-14 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/20 bg-black/5 font-mono text-xs uppercase tracking-wider mb-5">
                        Fun Fact
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-black mb-4">
                        The Wildcard
                    </h2>
                    <div className="space-y-4 text-black/70 font-body text-base md:text-lg leading-relaxed mb-6">
                        <p>
                            When I'm not coding, I'm likely obsessing over retro synthesizers or trying to bake the perfect sourdough bread (success rate: 60%).
                        </p>
                        <p className="mt-4 font-mono text-sm text-black/50 border-t border-black/10 pt-4">
                            &gt; FAVORITE EDITOR: VS Code (Vim Mode)<br />
                            &gt; COFFEE INTAKE: Dangerous<br />
                            &gt; TABS OR SPACES: Spaces (obviously)
                        </p>
                    </div>
                    <div className="flex items-center justify-center p-4 bg-accent-magenta/10 rounded-xl border border-accent-magenta/20">
                        <span className="font-mono text-accent-magenta font-bold">✨ READY TO DEPLOY ✨</span>
                    </div>
                </div>
            )
        }
    ];

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const currentCard = cards[currentIndex];

    return (
        <section
            className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-blueprint-base"
            id="about"
        >
            {/* Holographic CSS if Konami is active */}
            {konamiActive && (
                <style jsx global>{`
                    .holo-card {
                        background: linear-gradient(135deg, #f4f1ea 0%, #ffffff 50%, #f4f1ea 100%);
                        position: relative;
                        overflow: hidden;
                    }
                    .holo-card::before {
                        content: '';
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background: linear-gradient(125deg, 
                            rgba(255,0,0,0) 40%, 
                            rgba(255,0,0,0.2) 45%, 
                            rgba(0,255,0,0.2) 50%, 
                            rgba(0,0,255,0.2) 55%, 
                            rgba(0,0,0,0) 60%
                        );
                        background-size: 300% 300%;
                        animation: holo-shine 4s ease infinite;
                        pointer-events: none;
                        z-index: 50;
                        mix-blend-mode: color-burn;
                    }
                    @keyframes holo-shine {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}</style>
            )}

            <div className="container mx-auto px-6 md:px-8 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="relative cursor-pointer group"
                    onClick={nextCard}
                >
                    {/* Stacked card glow */}
                    <div className="absolute -inset-2 md:-inset-3 rounded-[2.25rem] bg-black/30 blur-2xl" />
                    <div className="absolute -inset-1 md:-inset-2 rounded-[2rem] bg-electric-primary/10 blur-xl" />

                    {/* Hint Loop */}
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-50 transition-opacity duration-500">
                        <RefreshCw className="w-6 h-6 text-white animate-spin-slow" />
                        <span className="text-[10px] font-mono text-white vertical-rl tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>Click to Deal</span>
                    </div>

                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            key={currentCard.id}
                            initial={{ x: 0, scale: 0.95, opacity: 0, rotate: 2 }}
                            animate={{ x: 0, scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ x: -200, opacity: 0, rotate: -10, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className={`relative rounded-[1.75rem] md:rounded-[2.5rem] border-2 border-black/10 bg-[#F4F1EA] text-[#141414] shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden min-h-[500px] ${konamiActive ? 'holo-card' : ''}`}
                        >
                            {/* Card corners */}
                            <div className="absolute top-6 left-6 flex flex-col items-start gap-2 z-20">
                                <span className="font-mono text-xs tracking-[0.3em] uppercase text-black/60">{currentCard.title}</span>
                                <span className="font-display text-3xl md:text-4xl text-black">{currentCard.rank}</span>
                                <span className={`w-6 h-6 rounded-sm ${currentCard.accentColor}`} />
                            </div>

                            <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2 z-20">
                                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/60">{currentCard.subtitle}</span>
                                <span className="font-display text-3xl md:text-4xl text-black">{currentCard.rank}</span>
                                <span className={`w-6 h-6 rounded-sm ${currentCard.accentColor}`} />
                            </div>

                            {/* Big letter block decoration */}
                            <div className={`absolute top-12 right-12 w-[220px] h-[240px] md:w-[320px] md:h-[340px] rounded-3xl ${currentCard.accentColor}/80 -rotate-3 shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-colors duration-500`} />
                            <div className="absolute top-16 right-16 w-[200px] h-[220px] md:w-[300px] md:h-[320px] rounded-3xl bg-white/90 rotate-2 border border-black/10" />
                            <div className="absolute top-16 right-16 w-[200px] h-[220px] md:w-[300px] md:h-[320px] flex items-center justify-center">
                                <span className="font-display text-[160px] md:text-[220px] leading-none text-black/80">{currentCard.rank}</span>
                            </div>

                            {/* Main Content */}
                            {currentCard.content}

                            {/* Bottom index row */}
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-black/50">
                                {cards.map((c, i) => (
                                    <span key={i} className={`transition-colors duration-300 ${i === currentIndex ? 'text-black font-bold scale-125' : ''}`}>
                                        {c.rank}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
