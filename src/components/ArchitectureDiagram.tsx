"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Example for PLAY-ON
export const PlayOnArchitecture = () => (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#60A5FA" />
            </marker>
            <filter id="glow-rect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        {/* Rust Core */}
        <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <rect x="50" y="150" width="200" height="100" fill="rgba(30, 64, 175, 0.1)" stroke="#1E40AF" strokeWidth="2" rx="8" />
            <text x="150" y="190" textAnchor="middle" fill="#E0E7FF" fontSize="14" fontWeight="bold" fontFamily="monospace">
                Rust Core
            </text>
            <text x="150" y="210" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="monospace">
                Audio Engine
            </text>
            <text x="150" y="225" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="monospace">
                State Management
            </text>
        </motion.g>

        {/* Tauri IPC */}
        <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
            <line x1="250" y1="200" x2="350" y2="200" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="4" />
            <rect x="280" y="180" width="40" height="20" fill="#0A0E1A" />
            <text x="300" y="194" textAnchor="middle" fill="#60A5FA" fontSize="10" fontFamily="monospace">
                IPC
            </text>
            <text x="300" y="220" textAnchor="middle" fill="#60A5FA" fontSize="9" fontFamily="monospace">
                ~0.3ms
            </text>
        </motion.g>

        {/* React Frontend */}
        <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
        >
            <rect x="350" y="150" width="200" height="100" fill="rgba(30, 64, 175, 0.1)" stroke="#1E40AF" strokeWidth="2" rx="8" />
            <text x="450" y="190" textAnchor="middle" fill="#E0E7FF" fontSize="14" fontWeight="bold" fontFamily="monospace">
                React Frontend
            </text>
            <text x="450" y="210" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="monospace">
                UI Layer (TypeScript)
            </text>
            <text x="450" y="225" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="monospace">
                Event Handlers
            </text>
        </motion.g>

        {/* WebView Boundary */}
        <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
        >
            <rect x="580" y="150" width="180" height="100" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="4" rx="8" />
            <text x="670" y="190" textAnchor="middle" fill="#E0E7FF" fontSize="14" fontWeight="bold" fontFamily="monospace">
                Single WebView
            </text>
            <text x="670" y="210" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="monospace">
                System Native
            </text>
        </motion.g>
    </svg>
);
