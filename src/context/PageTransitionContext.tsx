"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type TransitionPhase = 'idle' | 'closing' | 'opening';

interface PageTransitionContextType {
    phase: TransitionPhase;
    transitionTo: (href: string) => void;
    hasOnboarded: boolean;
    setHasOnboarded: (value: boolean) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export const PageTransitionProvider = ({ children }: { children: React.ReactNode }) => {
    const [phase, setPhase] = useState<TransitionPhase>('idle');
    const [hasOnboarded, setHasOnboarded] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Reset to "opening" when pathname changes (navigation complete)
    useEffect(() => {
        if (phase === 'closing') {
            setPhase('opening');
            // Allow time for opening animation before resetting to idle
            const timer = setTimeout(() => {
                setPhase('idle');
            }, 1000); // Duration of opening animation
            return () => clearTimeout(timer);
        } else if (phase === 'idle' && hasOnboarded) {
            // Browser back/forward detected!
            // Immediately snap to "opening" state so the curtain reveals the new page
            setPhase('opening');
            const timer = setTimeout(() => {
                setPhase('idle');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    const transitionTo = (href: string) => {
        if (phase !== 'idle') return; // Prevent double clicks

        setPhase('closing');

        // Wait for closing animation to finish before pushing new route
        setTimeout(() => {
            router.push(href);
        }, 800); // Duration of closing animation
    };

    return (
        <PageTransitionContext.Provider value={{ phase, transitionTo, hasOnboarded, setHasOnboarded }}>
            {children}
        </PageTransitionContext.Provider>
    );
};

export const usePageTransition = () => {
    const context = useContext(PageTransitionContext);
    if (context === undefined) {
        throw new Error('usePageTransition must be used within a PageTransitionProvider');
    }
    return context;
};
