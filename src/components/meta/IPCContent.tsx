import React from 'react';
import { Y2KIcons } from '../Y2KIcons';

export const IPCContent = () => (
    <div className="h-full flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
        <p className="text-sm text-white-soft/70 leading-relaxed">
            The architecture favors compile-time static analysis and zero-runtime overhead where possible.
        </p>

        <div className="space-y-3">
            <DecisionItem
                title="RSC over Client Components"
                desc="Zero client-side JS for static sections like Hero background."
                icon={<Y2KIcons.Globe />}
            />
            <DecisionItem
                title="Direct SVG"
                desc="SVG manipulation via props instead of heavy Canvas/WebGL libraries for simple vectors."
                icon={<Y2KIcons.Grid />}
            />
            <DecisionItem
                title="CSS Variables"
                desc="Runtime theming without CSS-in-JS injection overhead."
                icon={<Y2KIcons.Star />}
            />
        </div>

        <div className="mt-auto pt-4 border-t border-white/10">
            <h4 className="text-xs font-mono text-white-soft/50 uppercase tracking-widest mb-2">Philosophy</h4>
            <p className="text-xs text-white-soft/60 italic">
                "Don't ship what you don't need."
            </p>
        </div>
    </div>
);

const DecisionItem = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
    <div className="flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
        <div className="w-5 h-5 text-accent-cyan mt-0.5 shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="text-sm font-medium text-white-pure mb-0.5">{title}</h4>
            <p className="text-xs text-white-soft/60 leading-snug">{desc}</p>
        </div>
    </div>
);
