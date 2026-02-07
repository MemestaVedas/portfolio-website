import React from 'react';
import { Y2KIcons } from '../Y2KIcons';

const getIcon = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('heap') || t.includes('buffer')) return <Y2KIcons.Database />;
    if (t.includes('webview') || t.includes('instance')) return <Y2KIcons.Grid />;
    if (t.includes('decode') || t.includes('load')) return <Y2KIcons.Chip />;
    if (t.includes('mb') || t.includes('kb')) return <Y2KIcons.Chip />;
    return <Y2KIcons.Grid />;
};

export const ProjectMemory = ({ items }: { items: string[] }) => (
    <div className="h-full flex flex-col gap-4 overflow-y-auto no-scrollbar pr-2">
        <div className="space-y-3">
            {items?.map((item, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 items-center">
                    <div className="w-5 h-5 text-accent-pink shrink-0">
                        {getIcon(item)}
                    </div>
                    <p className="text-sm text-white-soft/80 leading-snug font-mono">
                        {item}
                    </p>
                </div>
            ))}
        </div>
        <div className="mt-auto pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-accent-pink animate-pulse" />
                <span className="text-xs font-mono text-accent-pink uppercase">Optimization Strategy</span>
            </div>
            <p className="text-[10px] text-white-soft/60 font-mono">
                Resource constrained environment active.
            </p>
        </div>
    </div>
);
