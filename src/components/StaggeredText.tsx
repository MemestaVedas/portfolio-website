"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTextReveal } from '@/hooks/useStaggeredReveal';

interface StaggeredTextProps {
    text: string;
    className?: string;
    variant?: 'character' | 'word';
    staggerTime?: number;
    delay?: number;
    tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * Text that reveals character-by-character or word-by-word
 * Triggered on scroll into view with configurable timing
 */
export const StaggeredText: React.FC<StaggeredTextProps> = ({
    text,
    className = "",
    variant = 'word',
    staggerTime = 0.05,
    delay = 0,
    tag = 'span'
}) => {
    const { containerVariants, characterVariants, wordVariants } = useTextReveal({
        staggerChildren: staggerTime,
        delayChildren: delay
    });

    const Tag = tag;
    const items = variant === 'character' ? text.split('') : text.split(' ');

    return (
        <Tag className={className}>
            <motion.span
                className="inline-flex flex-wrap"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {items.map((item, index) => (
                    <motion.span
                        key={index}
                        className="inline-block"
                        variants={variant === 'character' ? characterVariants : wordVariants}
                        style={{
                            transformOrigin: 'center bottom',
                            whiteSpace: item === ' ' ? 'pre' : 'normal'
                        }}
                    >
                        {item}
                        {variant === 'word' && index < items.length - 1 && '\u00A0'}
                    </motion.span>
                ))}
            </motion.span>
        </Tag>
    );
};

/**
 * Gradient text with staggered reveal
 */
export const GradientStaggeredText: React.FC<
    StaggeredTextProps & {
        gradient?: string;
    }
> = ({
    text,
    className = "",
    gradient = "linear-gradient(135deg, #C7F000 0%, #00F0FF 50%, #F4B4FF 100%)",
    variant = 'word',
    staggerTime = 0.05,
    delay = 0,
    tag = 'span'
}) => {
        const { containerVariants, wordVariants, characterVariants } = useTextReveal({
            staggerChildren: staggerTime,
            delayChildren: delay
        });

        const Tag = tag;
        const items = variant === 'character' ? text.split('') : text.split(' ');

        return (
            <Tag
                className={className}
                style={{
                    background: gradient,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    display: 'inline-block'
                }}
            >
                <motion.span
                    className="inline-flex flex-wrap"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    {items.map((item, index) => (
                        <motion.span
                            key={index}
                            className="inline-block"
                            variants={variant === 'character' ? characterVariants : wordVariants}
                            style={{
                                transformOrigin: 'center bottom',
                                whiteSpace: item === ' ' ? 'pre' : 'normal'
                            }}
                        >
                            {item}
                            {variant === 'word' && index < items.length - 1 && '\u00A0'}
                        </motion.span>
                    ))}
                </motion.span>
            </Tag>
        );
    };

/**
 * Line-by-line text reveal (for paragraphs)
 */
export const LineReveal: React.FC<{
    children: React.ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
}> = ({ children, className = "", delay = 0, stagger = 0.1 }) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: stagger,
                        delayChildren: delay
                    }
                }
            }}
        >
            {React.Children.map(children, (child, index) => (
                <motion.div
                    key={index}
                    variants={{
                        hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                        visible: {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            transition: {
                                duration: 0.6,
                                ease: [0.23, 1, 0.32, 1]
                            }
                        }
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default StaggeredText;
