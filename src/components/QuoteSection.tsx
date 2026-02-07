import React from 'react';
import { motion } from 'framer-motion';

const QuoteSection = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full w-full px-4">
            <motion.h2
                className="text-3xl md:text-5xl lg:text-6xl font-display text-white-soft leading-tight max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                I love developing <span className="text-accent-cyan">beautiful apps</span><br />which are <span className="text-accent-lime">fast</span> as well.
            </motion.h2>
        </div>
    );
};

export default QuoteSection;
