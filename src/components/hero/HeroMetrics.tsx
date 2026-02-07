import React from 'react';
import { motion } from 'framer-motion';

// Y2K styled metric display with enhanced entrance
export const MetricDisplay = ({
    value,
    label,
    compare,
    accentColor,
    index = 0
}: {
    value: string,
    label: string,
    compare?: string,
    accentColor: 'lime' | 'cyan' | 'pink',
    index?: number
}) => {
    const colors = {
        lime: 'text-accent-lime',
        cyan: 'text-accent-cyan',
        pink: 'text-accent-pink',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1]
            }}
            whileHover={{ scale: 1.02 }}
        >
            <motion.div
                className={`text-4xl font-metric ${colors[accentColor]} mb-1 tabular-nums`}
                initial={{ filter: 'blur(6px)' }}
                whileInView={{ filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
            >
                {value}
            </motion.div>
            <div className="text-xs text-white-soft/60 font-mono uppercase tracking-wider">
                {label}
            </div>
            {compare && (
                <div className="text-xs text-white-soft/40 mt-1 font-mono">
                    {compare}
                </div>
            )}
        </motion.div>
    );
};

export const ProofPoint = ({
    label,
    value,
    icon,
    delay
}: {
    label: string,
    value: string,
    icon: React.ReactNode,
    delay: number
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            className="border border-white-soft/20 rounded-xl p-4 bg-white/5 hover:bg-white/10 hover:border-white-soft/40 transition-all group cursor-default relative overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow overlay on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-electric-glow/0 to-accent-cyan/0 pointer-events-none"
                animate={{
                    background: isHovered
                        ? 'linear-gradient(135deg, rgba(165, 180, 255, 0.08) 0%, rgba(0, 240, 255, 0.05) 100%)'
                        : 'linear-gradient(135deg, rgba(165, 180, 255, 0) 0%, rgba(0, 240, 255, 0) 100%)'
                }}
                transition={{ duration: 0.3 }}
            />

            <div className="flex items-start gap-3 relative z-10">
                <motion.div
                    className="w-5 h-5 text-electric-glow group-hover:text-accent-cyan transition-colors shrink-0 mt-1"
                    animate={{ rotate: isHovered ? 15 : 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    {icon}
                </motion.div>
                <div>
                    <div className="text-xs text-white-soft/50 uppercase tracking-wider mb-1 font-mono">
                        {label}
                    </div>
                    <div className="text-sm text-white-pure font-body leading-snug">
                        {value}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

