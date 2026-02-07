import React from 'react';
import { Tradeoff } from '@/components/ProjectDeepDive';
import { Y2KIcons } from '../Y2KIcons';

export const ProjectTradeoffs = ({ negative, positive }: { negative: Tradeoff[], positive: Tradeoff[] }) => (
    <div className="h-full flex flex-col gap-5 overflow-y-auto no-scrollbar pr-2">
        {negative.map((item, i) => (
            <TradeoffItem
                key={i}
                isNegative
                title={item.title}
                desc={item.explanation}
            />
        ))}
        {positive.map((item, i) => (
            <TradeoffItem
                key={i}
                title={item.title}
                desc={item.explanation}
            />
        ))}
    </div>
);

const TradeoffItem = ({ title, desc, isNegative }: { title: string, desc: string, isNegative?: boolean }) => (
    <div className={`border rounded-lg p-4 bg-white/5 ${isNegative ? 'border-accent-pink/20 hover:border-accent-pink/40' : 'border-accent-lime/20 hover:border-accent-lime/40'} transition-colors`}>
        <div className="flex items-center gap-3 mb-2">
            <div className={`text-xl ${isNegative ? 'text-accent-pink' : 'text-accent-lime'}`}>
                {isNegative ? <span className="font-mono">✗</span> : <Y2KIcons.Shield className="w-5 h-5" />}
            </div>
            <h4 className="font-display text-lg text-white-pure">{title}</h4>
        </div>
        <p className="text-sm text-white-soft/70 leading-relaxed pl-9 font-body">
            {desc}
        </p>
    </div>
);
