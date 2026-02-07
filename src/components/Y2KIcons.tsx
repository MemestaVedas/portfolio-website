import React from 'react';

export const Y2KIcons = {
    Star: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            />
        </svg>
    ),

    Orbit: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
            {/* Main orbital ring */}
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" className="opacity-50" />
            {/* Inner orbit */}
            <circle cx="12" cy="12" r="6" strokeWidth="1.5" className="opacity-80" />
            {/* Satellite data point */}
            <circle cx="12" cy="2" r="2" fill="currentColor" stroke="none" />
            {/* Secondary satellite */}
            <circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none" className="opacity-60" />
        </svg>
    ),

    Arrow: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
            <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),

    Grid: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
            <path
                d="M3 3H10V10H3V3ZM14 3H21V10H14V3ZM3 14H10V21H3V14ZM14 14H21V21H14V14Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Center crosshair for precision feel */}
            <path d="M12 11V13M11 12H13" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),

    Globe: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path d="M2 12H22" strokeWidth="1.5" />
            <path d="M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2Z" strokeWidth="1.5" />
        </svg>
    ),

    Chip: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
            <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.5" />
            <path d="M9 9h6v6H9z" strokeWidth="1.5" />
            <path d="M9 1V4M15 1V4M9 20V23M15 20V23M20 9H23M20 14H23M1 9H4M1 14H4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),

    Timer: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
            <path d="M12 7v5l3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),

    Code: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
            <path d="M16 18L22 12L16 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6L2 12L8 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),

    Shield: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),

    Database: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
            <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="1.5" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),

    Discord: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.074.074 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
    ),

    Github: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
    ),
};
