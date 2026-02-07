import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ProjectData } from '../ProjectDeepDive';
import { MetaPanel } from '../meta/MetaPanel';
import { TiltCard } from '../TiltCard';

import { ProjectPerformance } from './ProjectPerformance';
import { ProjectIPC } from './ProjectIPC';
import { ProjectMemory } from './ProjectMemory';
import { ProjectTradeoffs } from './ProjectTradeoffs';

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 50 }
    }
};

export const ProjectBento = ({ project }: { project: ProjectData }) => {
    return (
        <motion.div
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
        >
            {/* 1. Performance Profile (Always Large/Prominent) */}
            <motion.div variants={item} className="col-span-1 lg:col-span-2 min-h-[300px]">
                <TiltCard
                    className="h-full"
                    glowColor="rgba(199, 240, 0, 0.15)"
                >
                    <MetaPanel
                        title="Performance Profile"
                        isActive={true}
                        onClick={() => { }}
                        className="h-full"
                    >
                        <ProjectPerformance metrics={project.metrics} />
                    </MetaPanel>
                </TiltCard>
            </motion.div>

            {/* 2. IPC Strategy (Conditional) */}
            {project.ipcStrategy && (
                <motion.div variants={item} className="col-span-1 min-h-[300px]">
                    <TiltCard
                        className="h-full"
                        glowColor="rgba(0, 240, 255, 0.15)"
                    >
                        <MetaPanel
                            title="IPC Strategy"
                            isActive={true}
                            onClick={() => { }}
                            className="h-full"
                        >
                            <ProjectIPC items={project.ipcStrategy} />
                        </MetaPanel>
                    </TiltCard>
                </motion.div>
            )}

            {/* 3. Memory Management (Conditional) */}
            {project.memoryManagement && (
                <motion.div variants={item} className="col-span-1 min-h-[300px]">
                    <TiltCard
                        className="h-full"
                        glowColor="rgba(244, 180, 255, 0.15)"
                    >
                        <MetaPanel
                            title="Memory Management"
                            isActive={true}
                            onClick={() => { }}
                            className="h-full"
                        >
                            <ProjectMemory items={project.memoryManagement} />
                        </MetaPanel>
                    </TiltCard>
                </motion.div>
            )}

            {/* 4. Engineering Tradeoffs (Fills remaining space or full width) */}
            <motion.div variants={item} className={`min-h-[300px] ${project.ipcStrategy && project.memoryManagement ? 'col-span-1 lg:col-span-2' : 'col-span-1'}`}>
                <TiltCard
                    className="h-full"
                    glowColor="rgba(255, 107, 74, 0.15)"
                >
                    <MetaPanel
                        title="Engineering Tradeoffs"
                        isActive={true}
                        onClick={() => { }}
                        className="h-full"
                    >
                        <ProjectTradeoffs
                            negative={project.tradeoffs.negative}
                            positive={project.tradeoffs.positive}
                        />
                    </MetaPanel>
                </TiltCard>
            </motion.div>
        </motion.div>
    );
};

