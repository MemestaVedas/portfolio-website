import React from 'react';
import { motion } from 'framer-motion';

// Y2K styled metric display
export const MetricDisplay = ({ value, label, compare, accentColor }: { value: string, label: string, compare?: string, accentColor: 'lime' | 'cyan' | 'pink' }) => {
    const colors = {
        lime: 'text-accent-lime',
        cyan: 'text-accent-cyan',
        pink: 'text-accent-pink',
    };

    return (
        <div>
            <div className={`text-4xl font-metric ${colors[accentColor]} mb-1 tabular-nums`}>
                {value}
            </div>
            <div className="text-xs text-white-soft/60 font-mono uppercase tracking-wider">
                {label}
            </div>
            {compare && (
                <div className="text-xs text-white-soft/40 mt-1 font-mono">
                    {compare}
                </div>
            )}
        </div>
    );
};

export const ProofPoint = ({ label, value, icon, delay }: { label: string, value: string, icon: React.ReactNode, delay: number }) => (
    <motion.div
        className="border border-white-soft/20 rounded-xl p-4 bg-white/5 hover:bg-white/10 hover:border-white-soft/40 transition-all group cursor-default"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
        <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-electric-glow group-hover:text-accent-cyan transition-colors shrink-0 mt-1">
                {icon}
            </div>
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
