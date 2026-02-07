"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Y2KIcons } from './Y2KIcons';

const ShootingStarUnderline = () => {
    return (
        <div className="relative w-full h-8 mt-1 flex items-center">
            {/* The Trail Line - Tapered Wedge Shape */}
            <div
                className="flex-1 h-[3px] relative bg-gradient-to-r from-transparent via-electric-primary to-accent-cyan opacity-60"
                style={{ clipPath: 'polygon(0 45%, 100% 0, 100% 100%, 0 55%)' }}
            >
                {/* Inner glow enhances the wedge */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* The Star at the end */}
            <motion.div
                className="relative z-10 text-accent-cyan"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Y2KIcons.Star className="w-6 h-6" />

                {/* Glow effect for the star */}
                <div className="absolute inset-0 bg-accent-cyan opacity-40 blur-md rounded-full -z-10" />
            </motion.div>
        </div>
    );
};

export default ShootingStarUnderline;
