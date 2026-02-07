import React from 'react';
import { ProjectMetric } from '@/components/ProjectDeepDive';

export const ProjectPerformance = ({ metrics }: { metrics: ProjectMetric[] }) => (
    <div className="h-full flex flex-col gap-6 overflow-y-auto no-scrollbar pr-2">
        <div className="grid grid-cols-1 gap-3">
            {metrics.map((metric, i) => (
                <div key={metric.name} className="p-4 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-white-soft text-sm uppercase tracking-wider font-mono opacity-70">
                            {metric.name}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${metric.improved ? 'bg-accent-lime/20 text-accent-lime' : 'bg-accent-pink/20 text-accent-pink'}`}>
                            {metric.delta}
                        </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-metric text-white-pure">
                            {metric.value}
                        </span>
                        <span className="text-xs text-white-soft/50">
                            vs {metric.baseline}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
