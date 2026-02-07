"use client";

import React from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    strength?: number;
    variant?: 'primary' | 'secondary' | 'ghost';
    download?: boolean;
}

/**
 * Button with magnetic cursor attraction
 * Subtle pull towards cursor on hover with enhanced click ripple effect
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    href,
    onClick,
    className = "",
    strength = 0.25,
    variant = 'primary',
    download = false
}) => {
    const { x, y, handleMouseMove, handleMouseLeave, isHovered } = useMagnetic({
        strength,
        radius: 120,
        damping: 20,
        stiffness: 200
    });

    const [ripple, setRipple] = React.useState<{ x: number; y: number } | null>(null);

    const handleClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setRipple({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setTimeout(() => setRipple(null), 600);
        onClick?.();
    };

    const variantStyles = {
        primary: `
            bg-white-pure text-blueprint-base font-mono
            hover:shadow-[0_0_30px_rgba(199,240,0,0.4)]
        `,
        secondary: `
            border-2 border-electric-glow text-electric-glow
            hover:bg-electric-glow/10 hover:shadow-[0_0_30px_rgba(165,180,255,0.3)]
        `,
        ghost: `
            text-white-soft/70 hover:text-white-pure
            hover:bg-white-soft/5
        `
    };

    const Component = href ? motion.a : motion.button;
    const props = href ? { href, target: "_blank", rel: "noopener noreferrer", download } : { onClick: handleClick };

    return (
        <Component
            {...props}
            className={`
                relative px-6 py-3 rounded-xl overflow-hidden
                transition-all duration-300 cursor-pointer
                inline-flex items-center gap-2
                ${variantStyles[variant]}
                ${className}
            `}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-lime/0 via-accent-lime/20 to-accent-lime/0 pointer-events-none"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{
                    x: isHovered ? '100%' : '-100%',
                    opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Ripple effect on click */}
            {ripple && (
                <motion.span
                    className="absolute bg-white/30 rounded-full pointer-events-none"
                    initial={{ width: 0, height: 0, opacity: 0.6 }}
                    animate={{ width: 200, height: 200, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            )}

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </Component>
    );
};

export default MagneticButton;
