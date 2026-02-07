"use client";

import { useEffect, useState, useCallback } from 'react';

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

/**
 * Hook that detects the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A).
 * Returns true when the code is successfully entered.
 */
export function useKonamiCode(): boolean {
    const [konamiActive, setKonamiActive] = useState(false);
    const [inputSequence, setInputSequence] = useState<string[]>([]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Get the key code
        const key = e.code;

        setInputSequence(prev => {
            const newSequence = [...prev, key].slice(-KONAMI_CODE.length);

            // Check if the sequence matches
            if (newSequence.length === KONAMI_CODE.length &&
                newSequence.every((k, i) => k === KONAMI_CODE[i])) {
                setKonamiActive(true);
                return [];
            }

            return newSequence;
        });
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return konamiActive;
}

export default useKonamiCode;
