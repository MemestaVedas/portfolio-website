"use client";

import React from 'react';
import FixedTVParallax from './FixedTVParallax';
import HeroContent from './HeroContent';
import HeroDecorativeElements from './HeroDecorativeElements';
import AboutSection from './AboutSection';
import QuoteSection from './QuoteSection';

/**
 * Hero Section with Fixed TV Parallax Effect
 * The TV frame stays fixed while content scrolls through it
 */
const Hero = () => {
    return (
        <FixedTVParallax
            heroContent={<HeroContent />}
            quoteContent={<QuoteSection />}
            aboutContent={<AboutSection />}
            decorativeElements={<HeroDecorativeElements />}
        />
    );
};

export default Hero;
