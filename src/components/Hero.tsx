"use client";

import React from 'react';
import FixedTVParallax from './FixedTVParallax';
import HeroContent from './HeroContent';
import HeroDecorativeElements from './HeroDecorativeElements';
import QuoteSection from './QuoteSection';
import ProjectIntroText from './ProjectIntroText';

/**
 * Hero Section with Fixed TV Parallax Effect
 * The TV frame stays fixed while content scrolls through it
 * Flow: Quote → Mission Control (w/ Project Cards) → Morph Intro Text → [MORPH]
 */
const Hero = () => {
    return (
        <FixedTVParallax
            heroContent={<HeroContent />}
            quoteContent={<QuoteSection />}
            morphIntroContent={<ProjectIntroText />}
            aboutContent={null}
            decorativeElements={<HeroDecorativeElements />}
        />
    );
};

export default Hero;
