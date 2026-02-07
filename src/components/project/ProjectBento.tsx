import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProjectData } from '../ProjectDeepDive';
import { MetaPanel } from '../meta/MetaPanel'; // Reusing the panel wrapper

import { ProjectPerformance } from './ProjectPerformance';
import { ProjectIPC } from './ProjectIPC';
import { ProjectMemory } from './ProjectMemory';
import { ProjectTradeoffs } from './ProjectTradeoffs';

type Tab = 'performance' | 'ipc' | 'memory' | 'tradeoffs';

export const ProjectBento = ({ project }: { project: ProjectData }) => {
    const [activeTab, setActiveTab] = useState<Tab>('performance');

    return (
        <div className="h-[500px] flex flex-col md:flex-row gap-4 w-full">
            <AnimatePresence>
                <MetaPanel
                    key="perf"
                    title="Performance Profile"
                    isActive={activeTab === 'performance'}
                    onClick={() => setActiveTab('performance')}
                >
                    <ProjectPerformance metrics={project.metrics} />
                </MetaPanel>

                {project.ipcStrategy && (
                    <MetaPanel
                        key="ipc"
                        title="IPC Strategy"
                        isActive={activeTab === 'ipc'}
                        onClick={() => setActiveTab('ipc')}
                    >
                        <ProjectIPC items={project.ipcStrategy} />
                    </MetaPanel>
                )}

                {project.memoryManagement && (
                    <MetaPanel
                        key="mem"
                        title="Memory Management"
                        isActive={activeTab === 'memory'}
                        onClick={() => setActiveTab('memory')}
                    >
                        <ProjectMemory items={project.memoryManagement} />
                    </MetaPanel>
                )}

                <MetaPanel
                    key="tradeoffs"
                    title="Engineering Tradeoffs"
                    isActive={activeTab === 'tradeoffs'}
                    onClick={() => setActiveTab('tradeoffs')}
                >
                    <ProjectTradeoffs
                        negative={project.tradeoffs.negative}
                        positive={project.tradeoffs.positive}
                    />
                </MetaPanel>
            </AnimatePresence>
        </div>
    );
};
