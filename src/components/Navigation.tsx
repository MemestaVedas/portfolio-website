"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Github, FileText } from 'lucide-react';
import { Y2KIcons } from './Y2KIcons';
import ConstellationNav from './ConstellationNav';

import { usePageTransition } from '@/context/PageTransitionContext';

const Navigation = () => {
    const { transitionTo } = usePageTransition();
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLowPower, setIsLowPower] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        let ticking = false;

        const checkConstraints = () => {
            const lowPower =
                window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
                !!(typeof navigator !== 'undefined' && navigator.deviceMemory && navigator.deviceMemory < 4);
            setIsLowPower(lowPower);
            setIsMobile(window.innerWidth < 768);
        };

        checkConstraints();
        window.addEventListener('resize', checkConstraints);

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > 50);
                ticking = false;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkConstraints);
        }
    }, []);

    if (isMobile) {
        return <MobileNav activeSection={activeSection} />;
    }

    return (
        <>
            {/* 1. TOP LEFT: Callsign (Logo) */}
            <motion.div
                className={`fixed top-6 left-6 z-50 hidden md:block`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div
                    onClick={() => transitionTo('/')}
                    className={`
                    w-14 h-14 rounded-xl flex items-center justify-center
                    shadow-glow hover:scale-105 transition-transform cursor-pointer
                    relative overflow-hidden
                `}>
                    <img
                        src="/yellow.png"
                        alt="Logo"
                        className="w-full h-full object-contain p-1"
                    />
                </div>
            </motion.div>

            {/* 2. CONSTELLATION NAVIGATION (Right Side) */}
            <ConstellationNav />

            {/* 3. PERSISTENT SOCIAL DOCK (Bottom Left) */}
            <motion.div
                className="fixed bottom-8 left-8 flex items-center gap-4 z-50 pointer-events-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                <div className="flex gap-3">
                    <a
                        href="https://github.com/kushal"
                        className="p-3 text-white-soft/60 hover:text-accent-lime hover:bg-white-soft/10 rounded-2xl transition-all border border-white-soft/20 hover:border-accent-lime/40 backdrop-blur-md"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href="https://discord.com/users/kushal"
                        className="p-3 text-white-soft/60 hover:text-[#5865F2] hover:bg-white-soft/10 rounded-2xl transition-all border border-white-soft/20 hover:border-[#5865F2]/40 backdrop-blur-md"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Discord"
                    >
                        <Y2KIcons.Discord className="w-5 h-5" />
                    </a>
                    <a
                        href="/KUSHAL NAYAK S P.pdf"
                        download
                        className="p-3 text-white-soft/60 hover:text-accent-pink hover:bg-white-soft/10 rounded-2xl transition-all border border-white-soft/20 hover:border-accent-pink/40 backdrop-blur-md flex items-center gap-2"
                        title="Download Resume"
                    >
                        <FileText className="w-5 h-5" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-tighter">CV</span>
                    </a>
                </div>
                {/* Decorative horizontal line and label */}
                <div className="hidden lg:block h-px w-8 bg-white-soft/20" />
                <span className="hidden lg:block font-mono text-[10px] text-white-soft/40 tracking-widest uppercase">
                    Connect
                </span>
            </motion.div>
        </>
    );
};

const DecryptLabel = ({ text, active = false }: { text: string; active?: boolean }) => {
    const chars = "01_x!<>[]{}*&^%$#@";
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = () => {
        let iteration = 0;
        clearInterval(intervalRef.current as NodeJS.Timeout);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
            }

            iteration += 1 / 3;
        }, 30);
    };

    useEffect(() => {
        if (isHovered) {
            scramble();
        } else {
            setDisplayText(text); // Reset immediately on leave, or could reverse scramble
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }, [isHovered, text]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }, []);

    return (
        <span
            className="relative font-mono"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {displayText}
            {/* Terminal Cursor Blink */}
            {(isHovered || active) && (
                <motion.span
                    className="inline-block w-[0.6ch] h-[1em] bg-accent-lime align-text-bottom ml-[1px]"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        times: [0, 0.5, 0.5, 1],
                        ease: "linear"
                    }}
                />
            )}
        </span>
    );
};

const NavItem = ({ href, label, active = false, onClick, isLowPower }: { href: string, label: string, active?: boolean, onClick: () => void, isLowPower: boolean }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const ref = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isLowPower || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Directly update motion values without triggering re-render
        x.set(Math.max(-8, Math.min(8, distanceX * 0.2)));
        y.set(Math.max(-8, Math.min(8, distanceY * 0.2)));
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onClick={onClick}
            className={`
        relative px-4 py-2 rounded-full text-sm font-mono
        transition-colors cursor-pointer flex items-center justify-center
        ${active
                    ? 'text-white-pure'
                    : 'text-white-soft/70 hover:text-white-pure'
                }
      `}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {/* Active indicator - Cyber Lamp (Bottom Glow) */}
            {active && (
                <motion.div
                    layoutId="active-pill"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent-lime shadow-[0_0_10px_2px_rgba(199,240,0,0.5)] rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}

            <div className="relative z-10">
                <DecryptLabel text={label} active={active} />
            </div>

            {!isLowPower && (
                <motion.div
                    className="absolute inset-0 bg-accent-cyan/0 rounded-full blur-md"
                    whileHover={{ backgroundColor: 'rgba(0, 240, 255, 0.05)' }}
                    transition={{ duration: 0.2 }}
                />
            )}
        </motion.a>
    );
};

const MobileNav = ({ activeSection }: { activeSection: string }) => (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="glass-card rounded-full px-6 py-4 border-2 border-white-soft/20 shadow-glow bg-blueprint-base/90 backdrop-blur-md">
            <div className="flex justify-around items-center">
                {[
                    { id: 'projects', icon: <Y2KIcons.Grid className="w-full h-full" />, label: 'Work' },
                    { id: 'architecture', icon: <Y2KIcons.Orbit className="w-full h-full" />, label: 'Arch' },
                    { id: 'meta', icon: <Y2KIcons.Star className="w-full h-full" />, label: 'Meta' },
                    { id: 'contact', icon: <Y2KIcons.Arrow className="w-full h-full" />, label: 'Contact' }
                ].map(item => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex flex-col items-center gap-1 group"
                    >
                        <div className={`
              w-6 h-6 transition-colors
              ${activeSection === item.id
                                ? 'text-accent-lime'
                                : 'text-white-soft/60 group-hover:text-white-pure'
                            }
            `}>
                            {item.icon}
                        </div>
                        <span className={`
              text-[10px] font-mono transition-colors uppercase tracking-wider
              ${activeSection === item.id
                                ? 'text-accent-lime'
                                : 'text-white-soft/60 group-hover:text-white-pure'
                            }
            `}>
                            {item.label}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    </nav>
);

export default Navigation;
