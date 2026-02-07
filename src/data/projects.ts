import { ProjectData } from "@/components/ProjectDeepDive";

export const projects: ProjectData[] = [
    {
        id: "play-on",
        name: "PLAY-ON!",
        icon: "/play-on-icon.png",
        problem: "Spotify's Electron architecture consumes excessive resources (180MB+ RAM), causing audible latency during heavy compile workloads.",
        constraint: "Must run under 50MB RAM idle to remain 'invisible' to the OS scheduler.",
        metrics: [
            {
                name: "Binary Size",
                value: "7.8 MB",
                baseline: "~120 MB",
                delta: "-93%",
                improved: true
            },
            {
                name: "Idle RAM",
                value: "42 MB",
                baseline: "180 MB",
                delta: "-77%",
                improved: true
            },
            {
                name: "Cold Start",
                value: "0.4s",
                baseline: "1.8s",
                delta: "-78%",
                improved: true
            },
            {
                name: "IPC Latency (avg)",
                value: "0.3ms",
                baseline: "~2-5ms",
                delta: "-85%",
                improved: true
            }
        ],
        tradeoffs: {
            negative: [
                {
                    title: "No hot module reload in dev",
                    explanation: "Rust recompiles add ~3s iteration time vs pure JS. Worth it for 60% memory reduction."
                },
                {
                    title: "Limited plugin ecosystem",
                    explanation: "Tauri plugins less mature than Electron's. Built custom audio engine instead."
                }
            ],
            positive: [
                {
                    title: "Smaller team attack surface",
                    explanation: "Rust's memory safety eliminates entire class of CVEs common in Node-based apps."
                }
            ]
        },
        ipcStrategy: [
            "Rust core owns playback state",
            "Frontend sends typed commands via Tauri IPC",
            "Zero JSON parsing on hot path",
            "Latency: ~0.3ms per command"
        ],
        memoryManagement: [
            "Single WebView instance (not per window)",
            "Audio buffers in Rust heap, not JS",
            "Lazy-load album art (progressive decode)",
            "Max resident set: 42MB (idle)"
        ],
        mockups: [
            "/projects/play-on-ss.png",
            "/projects/play-on-ss.png"
        ],
        tech: ["Rust", "Tauri", "React", "TypeScript", "Vite", "Tailwind"],
        categorizedStack: [
            { category: "Core", items: ["Rust", "Tauri"] },
            { category: "Frontend", items: ["React", "TypeScript", "Tailwind", "Vite"] }
        ],
        github: "https://github.com/kushal/play-on",
        demo: "https://play-on.app"
    },
    {
        id: "vibe-on",
        name: "VIBE-ON!",
        icon: "/VIBE-ON!_ICON.png",
        problem: "Desktop music players lock audio to the machine. I wanted to walk away from my desk but keep 'listening' to my compile status via auditory cues.",
        constraint: "Real-time audio streaming from Desktop to Mobile with sub-50ms latency to feel 'instant'.",
        metrics: [
            {
                name: "Audio Latency",
                value: "32 ms",
                baseline: "500ms+ (AirPlay)",
                delta: "-93%",
                improved: true
            },
            {
                name: "Sync Drift",
                value: "< 2ms",
                baseline: "~15ms",
                delta: "Tight",
                improved: true
            },
            {
                name: "Packet Loss",
                value: "0.1%",
                baseline: "TCP Retries",
                delta: "UDP FEC",
                improved: true
            },
            {
                name: "Discovery Time",
                value: "< 1s",
                baseline: "Manual IP",
                delta: "Auto",
                improved: true
            }
        ],
        tradeoffs: {
            negative: [
                {
                    title: "UDP Reliability",
                    explanation: "Dropped packets cause audio artifacts (clicks/pops) rather than buffering pauses. Optimized for real-time over fidelity."
                },
                {
                    title: "Network Dependency",
                    explanation: "Requires same WiFi network. No cloud relay fallback (intentional for latency)."
                }
            ],
            positive: [
                {
                    title: "Zero-Config Discovery",
                    explanation: "Custom mDNS implementation finds the desktop server instantly on the local network without IP configuration."
                },
                {
                    title: "Seamless Handoff",
                    explanation: "Switch audio output from PC speakers to phone in one tap. Playback continues uninterrupted."
                }
            ]
        },
        ipcStrategy: [
            "WebSocket for control commands (play/pause/seek)",
            "UDP multicast for audio chunks",
            "Forward Error Correction for packet loss recovery",
            "Latency: ~32ms end-to-end"
        ],
        memoryManagement: [
            "Circular audio buffer (100ms window)",
            "Opus codec for efficient compression",
            "Jitter buffer with adaptive sizing",
            "Mobile battery optimization (background audio)"
        ],
        mockups: [
            "/VIBE-ON!_SS.png"
        ],
        tech: ["Kotlin", "Jetpack Compose", "Rust", "WebSockets", "UDP", "Opus"],
        categorizedStack: [
            { category: "PC", items: ["Rust", "WebSockets", "UDP", "Opus"] },
            { category: "Mobile", items: ["Kotlin", "Jetpack Compose"] }
        ],
        techTooltips: {
            "Opus": "The JS library, not anthropic's model lol"
        },
        github: "https://github.com/MemestaVedas/vibe-on",
        demo: "https://vibe-on.app"
    }
];
