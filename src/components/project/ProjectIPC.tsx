import React from 'react';
import { Y2KIcons } from '../Y2KIcons';

const getIcon = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('rust')) return <Y2KIcons.Code />;
    if (t.includes('latency') || t.includes('time')) return <Y2KIcons.Timer />;
    if (t.includes('json') || t.includes('data')) return <Y2KIcons.Database />;
    if (t.includes('frontend') || t.includes('ui')) return <Y2KIcons.Grid />;
    return <Y2KIcons.Arrow />;
};

export const ProjectIPC = ({ items }: { items: string[] }) => (
    <div className="h-full flex flex-col gap-4 overflow-y-auto no-scrollbar pr-2">
        <div className="space-y-3">
            {items?.map((item, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 items-center">
                    <div className="w-5 h-5 text-accent-cyan shrink-0">
                        {getIcon(item)}
                    </div>
                    <p className="text-sm text-white-soft/80 leading-snug font-mono">
                        {item}
                    </p>
                </div>
            ))}
        </div>
    </div>
);
