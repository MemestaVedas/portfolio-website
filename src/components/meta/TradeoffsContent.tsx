import React from 'react';
import { Y2KIcons } from '../Y2KIcons';

export const TradeoffsContent = () => (
    <div className="h-full flex flex-col gap-5 overflow-y-auto pr-2 custom-scrollbar">
        <TradeoffItem
            isNegative
            title="No hot module reload in dev"
            desc="Rust recompiles add ~3s iteration time vs pure JS. Worth it for 60% memory reduction."
        />

        <TradeoffItem
            isNegative
            title="Limited plugin ecosystem"
            desc="Tauri plugins less mature than Electron's. Built custom audio engine instead."
        />

        <div className="mt-auto pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2">
                <Y2KIcons.Star className="w-4 h-4 text-accent-lime" />
                <span className="text-xs font-mono text-accent-lime uppercase tracking-widest">
                    The Payoff
                </span>
            </div>
            <p className="text-sm text-white-pure font-body leading-relaxed">
                A "Systems-First" approach means accepting friction in development to guarantee frictionless experience for the end-user.
            </p>
        </div>
    </div>
);

const TradeoffItem = ({ title, desc, isNegative }: { title: string, desc: string, isNegative?: boolean }) => (
    <div className="border border-white/10 rounded-lg p-4 bg-white/5">
        <div className="flex items-center gap-3 mb-2">
            <div className={`text-lg font-mono ${isNegative ? 'text-accent-pink' : 'text-accent-cyan'}`}>
                {isNegative ? 'X' : '✓'}
            </div>
            <h4 className="font-display text-lg text-white-pure">{title}</h4>
        </div>
        <p className="text-sm text-white-soft/70 leading-relaxed pl-8">
            {desc}
        </p>
    </div>
);
