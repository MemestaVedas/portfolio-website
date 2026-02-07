"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';

interface TerminalInterfaceProps {
    onExit: () => void;
}

const COMMANDS: Record<string, string> = {
    help: "Available commands: about, skills, contact, clear, exit, whoami, sudo",
    about: "System Identity: Full Stack Engineer specialized in high-performance web applications and system architecture.",
    skills: "Loaded Modules: React, Next.js, TypeScript, Rust, C++, WebGL, System Design.",
    contact: "Communication Uplink: Open for opportunities. Signal strength: STRONG.",
    whoami: "User: Guest [Access Level: RESTRICTED]",
    sudo: "Access Denied. You didn't say the magic word.",
    clear: "CLEAR_BUFFER"
};

const TerminalInterface: React.FC<TerminalInterfaceProps> = ({ onExit }) => {
    const [history, setHistory] = useState<string[]>(["System initialized...", "Welcome to OVERRIDE_OS v2.0", "Type 'help' to view command list."]);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();

        if (cleanCmd === 'exit') {
            onExit();
            return;
        }

        if (cleanCmd === 'clear') {
            setHistory([]);
            return;
        }

        let response = "";
        if (COMMANDS[cleanCmd]) {
            response = COMMANDS[cleanCmd];
        } else if (cleanCmd !== "") {
            response = `Command not found: ${cleanCmd}`;
        }

        setHistory(prev => [...prev, `> ${cmd}`, response].filter(Boolean));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <motion.div
            className="w-full h-full bg-black/95 border border-accent-lime/50 rounded-xl overflow-hidden font-mono text-sm md:text-base shadow-[0_0_50px_rgba(199,240,0,0.2)] relative z-50 flex flex-col pointer-events-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => inputRef.current?.focus()}
        >
            {/* Header */}
            <div className="bg-accent-lime/10 border-b border-accent-lime/20 p-3 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 text-accent-lime">
                    <Terminal size={16} />
                    <span className="text-xs uppercase tracking-widest font-bold">System Override // Terminal</span>
                </div>
                <div
                    onClick={(e) => { e.stopPropagation(); onExit(); }}
                    className="p-1 hover:bg-accent-lime/20 rounded-md transition-colors text-accent-lime cursor-pointer pointer-events-auto"
                >
                    <X size={16} />
                </div>
            </div>

            {/* CRT Overlay Effects */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]" />
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] animate-pulse bg-white mixed-blend-overlay" />

            {/* Terminal Content */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-accent-lime relative z-0">
                <div className="space-y-1">
                    {history.map((line, i) => (
                        <div key={i} className={`${line.startsWith('>') ? 'text-white/60' : 'text-accent-lime'} break-words leading-relaxed`}>
                            {line}
                        </div>
                    ))}
                </div>

                {/* Input Line */}
                <div className="flex items-center mt-2">
                    <span className="text-accent-lime mr-2 shrink-0">{'>'}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-accent-lime"
                        autoFocus
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
                <div ref={bottomRef} className="h-4" />
            </div>
        </motion.div>
    );
};

export default TerminalInterface;
