import React from 'react';

export const MemoryContent = () => (
    <div className="h-full flex flex-col justify-between overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-white-soft">Heap Usage</span>
                    <span className="font-mono text-accent-pink">42 MB</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                    <div className="h-full bg-accent-pink w-[25%]" />
                    <div className="h-full bg-transparent w-[75%]" />
                </div>
                <div className="flex justify-between text-[10px] text-white-soft/40 font-mono">
                    <span>Used</span>
                    <span>Total Available</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <StatBox label="Nodes" value="< 500" />
                <StatBox label="Listeners" value="~12" />
            </div>

            <p className="text-xs text-white-soft/60 leading-relaxed border-l-2 border-accent-pink/50 pl-3">
                Explicit object pooling for particle systems and aggressive cleanup in `useEffect` return blocks prevents memory leaks.
            </p>
        </div>

        <div className="mt-4 p-3 bg-accent-pink/5 border border-accent-pink/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-accent-pink animate-pulse" />
                <span className="text-xs font-mono text-accent-pink uppercase">Garbage Collection</span>
            </div>
            <p className="text-[10px] text-white-soft/70">
                Optimized allocation patterns reduce minor GC pressure during animations.
            </p>
        </div>
    </div>
);

const StatBox = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-white/5 rounded p-2 text-center border border-white/5">
        <div className="text-lg font-metric text-white-pure">{value}</div>
        <div className="text-[10px] text-white-soft/50 uppercase tracking-wider">{label}</div>
    </div>
);
