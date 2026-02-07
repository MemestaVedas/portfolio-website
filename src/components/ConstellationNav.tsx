"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NavigationNode {
    id: string;
    label: string;
    x: number;
    y: number;
    connections: string[];
}

const navigationData: NavigationNode[] = [
    { id: 'home', label: 'Home', x: 50, y: 8, connections: ['about'] },
    { id: 'about', label: 'About', x: 40, y: 22, connections: ['home', 'projects'] },
    { id: 'projects', label: 'Projects', x: 75, y: 38, connections: ['about', 'skills'] },
    { id: 'skills', label: 'Skills', x: 65, y: 55, connections: ['projects', 'meta'] },
    { id: 'meta', label: 'Meta', x: 80, y: 72, connections: ['skills', 'contact'] },
    { id: 'contact', label: 'Contact', x: 55, y: 88, connections: ['meta'] },
];


const ConstellationNav = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [bgStars, setBgStars] = useState<{ id: number, left: string, top: string, duration: number, delay: number }[]>([]);

    useEffect(() => {
        setIsMounted(true);
        // Generate stars only on the client to avoid hydration mismatch
        const stars = [...Array(12)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2
        }));
        setBgStars(stars);
    }, []);
    const containerRef = useRef<HTMLDivElement>(null);

    // Detect active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'projects', 'skills', 'meta', 'contact'];
            const scrollPosition = window.scrollY + window.innerHeight * 0.4;

            for (const section of [...sections].reverse()) {
                const element = section === 'skills'
                    ? document.querySelector('#architecture')
                    : section === 'contact'
                        ? document.querySelector('#contact')
                        : document.getElementById(section);

                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;

                    if (scrollPosition >= elementTop) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNodeClick = (nodeId: string) => {
        const targetMap: Record<string, string> = {
            home: '#home',
            about: '#about',
            projects: '#projects',
            skills: '#architecture',
            meta: '#meta',
            contact: '#contact',
        };

        const targetSelector = targetMap[nodeId];
        const element = document.querySelector(targetSelector);

        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const isNodeConnected = (nodeId: string) => {
        if (!hoveredNode) return false;
        const hoveredNodeData = navigationData.find(n => n.id === hoveredNode);
        return hoveredNodeData?.connections.includes(nodeId) || nodeId === hoveredNode;
    };

    return (
        <div
            ref={containerRef}
            className="fixed top-1/2 -translate-y-1/2 w-64 h-[600px] z-40 hidden xl:block pointer-events-none"
            style={{
                right: 'calc((100vw - 1280px) / 2 + -15rem)',
                maxWidth: '280px',
            }}
        >
            <div className="relative w-full h-full">
                {/* SVG Canvas for Connection Lines */}
                <svg
                    className="absolute inset-0 w-full h-full overflow-visible"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        {/* Gradient for connection lines */}
                        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2F43FF" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#2F43FF" stopOpacity="0.3" />
                        </linearGradient>

                        {/* Active gradient */}
                        <linearGradient id="activeConnectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#C7F000" stopOpacity="0.6" />
                            <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#C7F000" stopOpacity="0.6" />
                        </linearGradient>
                    </defs>

                    {/* Draw connections */}
                    {navigationData.map((node) =>
                        node.connections.map((connectedId) => {
                            const connectedNode = navigationData.find(n => n.id === connectedId);
                            if (!connectedNode) return null;

                            // Only draw each connection once
                            if (node.id > connectedId) return null;

                            const isHighlighted = isNodeConnected(node.id) || isNodeConnected(connectedId);

                            return (
                                <g key={`${node.id}-${connectedId}`}>
                                    <motion.line
                                        x1={node.x}
                                        y1={node.y}
                                        x2={connectedNode.x}
                                        y2={connectedNode.y}
                                        stroke={isHighlighted ? "url(#activeConnectionGradient)" : "url(#connectionGradient)"}
                                        strokeWidth={isHighlighted ? "0.5" : "0.3"}
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            pathLength: 1,
                                            opacity: isHighlighted ? 1 : 0.5,
                                            strokeWidth: isHighlighted ? "0.5" : "0.3"
                                        }}
                                        transition={{
                                            pathLength: { duration: 1.5, delay: 0.5 },
                                            opacity: { duration: 0.3 },
                                            strokeWidth: { duration: 0.3 }
                                        }}
                                    />
                                </g>
                            );
                        })
                    )}
                </svg>

                {/* Star Nodes */}
                {navigationData.map((node, index) => {
                    const isActive = activeSection === node.id;
                    const isHovered = hoveredNode === node.id;
                    const isConnected = isNodeConnected(node.id);

                    return (
                        <div
                            key={node.id}
                            className="absolute pointer-events-none flex items-center justify-center"
                            style={{
                                left: `${node.x}%`,
                                top: `${node.y}%`,
                                width: '1px',
                                height: '1px',
                            }}
                        >
                            <motion.div
                                className="pointer-events-auto flex items-center justify-center relative"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: 0.3 + index * 0.1,
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 20
                                }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                onClick={() => handleNodeClick(node.id)}
                            >
                                {/* Star node - SVG star shape */}
                                <motion.svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    className="cursor-pointer relative z-10"
                                    animate={{
                                        scale: isHovered ? 1.5 : 1,
                                        filter: isActive
                                            ? 'drop-shadow(0 0 8px rgba(199, 240, 0, 0.8)) drop-shadow(0 0 16px rgba(199, 240, 0, 0.4))'
                                            : isHovered
                                                ? 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.6))'
                                                : 'drop-shadow(0 0 4px rgba(165, 180, 255, 0.4))',
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                >
                                    <path
                                        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                                        fill={isActive ? '#C7F000' : isConnected ? '#00F0FF' : '#A5B4FF'}
                                        stroke={isActive ? '#FFFFFF' : isConnected ? '#00F0FF' : '#E8EAFF'}
                                        strokeWidth="0.5"
                                    />
                                </motion.svg>

                                {/* Label */}
                                <motion.div
                                    className={`absolute left-full ml-4 whitespace-nowrap pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                    animate={{
                                        opacity: isHovered || isActive ? 1 : 0,
                                        x: isHovered || isActive ? 0 : -10,
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className={`font-mono text-sm tracking-wider ${isActive
                                        ? 'text-accent-lime font-bold'
                                        : 'text-white-soft'
                                        }`}>
                                        {node.label}
                                    </span>
                                </motion.div>
                            </motion.div>
                        </div>
                    );
                })}

                {/* Background stars decoration */}
                {bgStars.map((star) => (
                    <motion.div
                        key={`bg-star-${star.id}`}
                        className="absolute w-1 h-1 rounded-full bg-white-soft/20"
                        style={{
                            left: star.left,
                            top: star.top,
                        }}
                        animate={{
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ConstellationNav;
