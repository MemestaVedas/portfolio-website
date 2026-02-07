"use client";

import React from 'react';

const SpaceBackdrop = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
        <div className="absolute inset-0 space-nebula" />
        <div className="absolute inset-0 space-stars" />
        <div className="absolute inset-0 space-dust" />
    </div>
);

export default SpaceBackdrop;
