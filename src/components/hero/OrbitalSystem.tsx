import React from 'react';

// Enhanced Orbital System (Dashed rings + Satellites)
export const OrbitalSystem = () => (
    <svg className="w-full h-full animate-[spin_60s_linear_infinite]" viewBox="0 0 1000 1000">
        <defs>
            <linearGradient id="ring-gradient-core" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="satellite-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C7F000" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C7F000" stopOpacity="0" />
            </radialGradient>
        </defs>

        {/* Inner Solid Ring */}
        <circle cx="500" cy="500" r="300" fill="none" stroke="url(#ring-gradient-core)" strokeWidth="1" className="opacity-30" />

        {/* Middle Dashed Ring (Technical) */}
        <circle cx="500" cy="500" r="450" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 8" className="opacity-20" />

        {/* Outer Fine Ring */}
        <circle cx="500" cy="500" r="600" fill="none" stroke="white" strokeWidth="0.5" className="opacity-40" />

        {/* Orbiting Satellite Data Points */}
        <g className="animate-[spin_10s_linear_infinite_reverse] origin-center">
            {/* Satellite on middle ring */}
            <circle cx="50" cy="500" r="4" fill="#C7F000" />
            <circle cx="50" cy="500" r="12" fill="url(#satellite-glow)" />
        </g>

        <g className="animate-[spin_25s_linear_infinite] origin-center">
            {/* Satellite on outer ring */}
            <circle cx="1100" cy="500" r="3" fill="#00F0FF" />
        </g>
    </svg>
);
