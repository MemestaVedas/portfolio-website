import React from 'react';
import { motion, MotionValue, useMotionTemplate, useTransform, useMotionValue } from 'framer-motion';

interface CRTFrameProps {
    children: React.ReactNode;
    className?: string;
    screenOpacity?: number | MotionValue<number>;
    scale?: number | MotionValue<number>;
    borderRadius?: number | MotionValue<number>;
    frameOpacity?: number | MotionValue<number>;
}

/**
 * Reusable CRT TV Frame component
 * Provides the retro TV shell with bezel, LEDs, and screen effects
 */
export const CRTFrame: React.FC<CRTFrameProps> = ({
    children,
    className = "",
    screenOpacity = 1,
    scale = 1,
    borderRadius = 64,
    frameOpacity = 1
}) => {
    // Dynamic background with motion template for performance
    const background = useMotionTemplate`linear-gradient(135deg, rgba(10,10,10,${screenOpacity}) 0%, rgba(0,0,0,${screenOpacity}) 50%, rgba(10,10,10,${screenOpacity}) 100%)`;

    // Derive morph state: disable expensive effects when frame is fading
    const isMorphing = typeof frameOpacity !== 'number';
    const bulgeRotateX = isMorphing
        ? useTransform(frameOpacity as MotionValue<number>, [1, 0.5, 0], [2, 0.5, 0])
        : 2;
    const perspectiveValue = isMorphing
        ? useTransform(frameOpacity as MotionValue<number>, [1, 0.5, 0], [1000, 1500, 2000])
        : 1000;

    // Dynamic shadow opacity to reduce GPU load during expansion
    const scaleValue = typeof scale === 'number' ? useMotionValue(scale) : (scale as MotionValue<number>);
    const shadowOpacity = useTransform(scaleValue, [1, 5], [0.5, 0]);

    const shadow = useMotionTemplate`
        0 40px 80px rgba(0,0,0,${shadowOpacity}),
        0 20px 40px rgba(0,0,0,${useTransform(shadowOpacity, o => o * 0.8)}),
        inset 0 2px 0 rgba(255,255,255,0.08),
        inset 0 -2px 0 rgba(0,0,0,${useTransform(shadowOpacity, o => o * 0.6)})
    `;

    return (
        <motion.div
            className={`relative w-full max-w-5xl mx-6 md:mx-8 ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            style={{
                scale: scale,
                willChange: 'transform'
            }}
        >
            {/* CRT TV Outer Shell */}
            <motion.div
                className="relative p-4 md:p-6"
                style={{
                    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
                    background: 'linear-gradient(145deg, #2a2a45 0%, #1a1a2e 50%, #0d0d1a 100%)',
                    opacity: frameOpacity,
                    boxShadow: shadow,
                    willChange: 'transform, border-radius, box-shadow'
                }}
            >
                {/* CRT bezel highlight (top edge reflection) */}
                <div className="absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* LED Indicators */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-4 z-10">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_8px_#C7F000]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="px-3 py-1 rounded-full bg-console-dark border border-white/10 flex items-center">
                        <span className="font-mono text-[8px] text-white/50 tracking-widest uppercase">Signal</span>
                    </div>
                    <motion.div
                        className="w-2 h-2 rounded-full bg-accent-pink shadow-[0_0_8px_#FF00FF]"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>

                {/* The CRT Screen (with bulge effect) */}
                <motion.div
                    className="relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] h-[500px] md:h-[650px] w-full"
                    style={{
                        background: background,
                        boxShadow: `
                            inset 0 0 60px rgba(0,0,0,0.8),
                            inset 0 0 120px rgba(0,0,0,0.6),
                            inset 0 -20px 60px rgba(0,0,0,0.5),
                            0 4px 0 rgba(0,0,0,0.3)
                        `,
                        transformOrigin: 'center center',
                        perspective: perspectiveValue,
                        rotateX: bulgeRotateX,
                    }}
                >
                    {/* Screen glass reflection overlay - lighter */}
                    <div
                        className="absolute inset-0 pointer-events-none z-20"
                        style={{
                            background: `
                                radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%),
                                radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0,0,0,0.1) 0%, transparent 50%)
                            `,
                        }}
                    />

                    {/* CRT curvature edge shadows - subtler */}
                    <div className="absolute inset-0 pointer-events-none z-10 rounded-[2rem] md:rounded-[3.5rem]"
                        style={{
                            boxShadow: `
                                inset 4px 0 10px rgba(0,0,0,0.15),
                                inset -4px 0 10px rgba(0,0,0,0.15),
                                inset 0 4px 10px rgba(0,0,0,0.1),
                                inset 0 -4px 20px rgba(30,43,153,0.2)
                            `,
                        }}
                    />

                    {/* Screen content - static container (no internal scroll, controlled by parent) */}
                    <div className="relative z-10 w-full h-full overflow-hidden">
                        {children}
                    </div>

                    {/* CRT scanline effect - very faint */}
                    <div
                        className="absolute inset-0 pointer-events-none z-30 opacity-[0.015]"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)'
                        }}
                    />
                </motion.div>

                {/* TV brand/label at bottom of bezel */}
                <motion.div
                    className="flex justify-center items-center gap-4 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1 }}
                >
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
                    <span className="font-mono text-[10px] text-white-soft/40 tracking-[0.4em] uppercase">
                        SYSTEM ONLINE
                    </span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
                </motion.div>
            </motion.div>
        </motion.div >
    );
};

export default CRTFrame;
