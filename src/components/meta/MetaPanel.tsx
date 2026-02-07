import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Y2KIcons } from '../Y2KIcons';

interface MetaPanelProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

export const MetaPanel = ({ title, isActive, onClick, children, className }: MetaPanelProps) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={clsx(
                "relative border border-blueprint-line/40 rounded-2xl overflow-hidden cursor-pointer bg-blueprint-base/40 backdrop-blur-sm transition-colors hover:border-blueprint-line/60",
                className
            )}
            initial={false}
            animate={{
                flex: isActive ? 3 : 0.5
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
            {/* Header / Title Stripe */}
            <div
                className={clsx(
                    "absolute inset-x-0 top-0 transition-all duration-300 flex items-center justify-between",
                    isActive ? "h-14 px-6 border-b border-blueprint-line/20 bg-white/5" : "h-full w-full flex-col py-6"
                )}
            >
                <div className={clsx("transition-transform duration-300 origin-center", !isActive && "rotate-[-90deg] whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2")}>
                    <h3 className="font-display text-lg text-white-pure whitespace-nowrap">
                        {title}
                    </h3>
                </div>

                <motion.div
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={clsx(!isActive && "hidden")} // Hide arrow when collapsed vertical
                >
                    <Y2KIcons.Arrow className="w-4 h-4 text-accent-lime" />
                </motion.div>
            </div>

            {/* Content Area */}
            <div className={clsx("pt-20 px-6 pb-6 h-full overflow-hidden", !isActive && "opacity-0")}>
                <motion.div
                    animate={{ opacity: isActive ? 1 : 0 }} // Fade out completely when collapsed
                    transition={{ duration: 0.3 }}
                    className="h-full"
                >
                    {children}
                </motion.div>
            </div>

            {/* Inactive Overlay Gradient */}
            {!isActive && (
                <div className="absolute inset-0 bg-blueprint-base/20 pointer-events-none hover:bg-white/5 transition-colors" />
            )}
        </motion.div>
    );
};
