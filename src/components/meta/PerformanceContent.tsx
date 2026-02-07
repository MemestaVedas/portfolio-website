import React from 'react';
import Image from 'next/image';

export const PerformanceContent = () => (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-blueprint-line/30 rounded-lg p-4 bg-black/20">
                <h4 className="text-accent-lime font-mono text-xs mb-2 uppercase tracking-wider">Lighthouse</h4>
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-metric text-white-pure">100</span>
                    <span className="text-sm text-white-soft/60 mb-1">/ 100</span>
                </div>
            </div>
            <div className="border border-blueprint-line/30 rounded-lg p-4 bg-black/20">
                <h4 className="text-accent-cyan font-mono text-xs mb-2 uppercase tracking-wider">First Load JS</h4>
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-metric text-white-pure">78KB</span>
                    <span className="text-sm text-white-soft/60 mb-1">Gzipped</span>
                </div>
            </div>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-4">
            <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                <div className="flex justify-between mb-2">
                    <span className="text-white-soft text-sm">Largest Contentful Paint</span>
                    <span className="text-accent-lime font-mono text-sm">0.8s</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-lime w-[80%]" />
                </div>
            </div>

            <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                <div className="flex justify-between mb-2">
                    <span className="text-white-soft text-sm">Total Blocking Time</span>
                    <span className="text-accent-lime font-mono text-sm">120ms</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-lime w-[15%]" />
                </div>
            </div>
        </div>

        {/* Flamegraph */}
        <div className="relative border border-blueprint-line/30 rounded-lg overflow-hidden h-40 shrink-0 mt-auto group">
            <Image
                src="/meta/flamegraph.png"
                alt="React profiler flamegraph"
                fill
                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-[10px] font-mono text-white-soft backdrop-blur-sm">
                Single Frame Render (&lt;16ms)
            </div>
        </div>
    </div>
);
