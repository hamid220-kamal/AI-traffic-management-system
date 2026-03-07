import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LiveIntersection() {
    const [activeSignal, setActiveSignal] = useState('N-S Turn');

    useEffect(() => {
        const signals = ['N-S Turn', 'E-W Straight', 'S-W Turn', 'N-W Straight'];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % signals.length;
            setActiveSignal(signals[i]);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex items-center justify-center p-4">
            <div className="relative w-80 h-80 bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50 shadow-inner flex items-center justify-center">
                {/* Intersection Background Schematic */}
                <div className="absolute w-20 h-[120%] bg-slate-700/30 transform -rotate-45 block" />
                <div className="absolute w-[120%] h-20 bg-slate-700/30 transform -rotate-45 block" />

                {/* Vertical Road */}
                <div className="absolute top-0 bottom-0 left-[35%] right-[35%] bg-slate-900/60 border-l border-r border-slate-700 flex flex-row">
                    <div className="flex-1 border-r border-dashed border-slate-500/30 h-full"></div>
                    <div className="flex-1 h-full"></div>
                </div>

                {/* Horizontal Road */}
                <div className="absolute left-0 right-0 top-[35%] bottom-[35%] bg-slate-900/60 border-t border-b border-slate-700 flex flex-col">
                    <div className="flex-1 border-b border-dashed border-slate-500/30 w-full"></div>
                    <div className="flex-1 w-full"></div>
                </div>

                {/* Center Box */}
                <div className="absolute w-[30%] h-[30%] bg-slate-800 border border-slate-600 rounded">
                    <div className="w-full h-full flex items-center justify-center relative">
                        <span className="text-cyan-500 font-bold text-xs opacity-50 z-10 text-center">HITEC<br />JN_01</span>
                    </div>
                </div>

                {/* N-S Turn Indicators */}
                <TrafficLight active={activeSignal === 'N-S Turn'} position="top-[30%] left-[45%]" />
                <TrafficLight active={activeSignal === 'E-W Straight'} position="bottom-[45%] right-[30%]" />
                <TrafficLight active={activeSignal === 'S-W Turn'} position="bottom-[30%] right-[45%]" />
                <TrafficLight active={activeSignal === 'N-W Straight'} position="top-[45%] left-[30%]" />

                {/* Vehicles visualization placeholders */}
                <Car position="top-[20%] left-[38%]" animate={activeSignal === 'N-S Turn'} delay={0} />
                <Car position="top-[10%] left-[38%]" animate={activeSignal === 'N-S Turn'} delay={0.2} />

                <Car position="bottom-[20%] right-[38%]" animate={activeSignal === 'S-W Turn'} delay={0} rotate />

                <Car position="left-[20%] bottom-[38%]" animate={activeSignal === 'E-W Straight'} delay={0.1} horizontal />
                <Car position="right-[20%] top-[38%]" animate={activeSignal === 'N-W Straight'} delay={0.3} horizontal rotate />
            </div>
        </div>
    );
}

const TrafficLight = ({ active, position }) => (
    <div className={`absolute ${position} w-3 h-3 rounded-full flex items-center justify-center z-20 ${active ? 'bg-emerald-500 text-emerald-900 shadow-[0_0_10px_2px_rgba(16,185,129,0.5)]' : 'bg-red-500/80'}`}>
        <div className={`w-1 h-1 rounded-full ${active ? 'bg-white/90' : 'bg-red-900/50'}`} />
    </div>
);

const Car = ({ position, animate, delay, horizontal, rotate }) => {
    const animations = {
        vertical: animate ? { y: [0, 100, 200], opacity: [1, 1, 0] } : { y: 0, opacity: 1 },
        horizontal: animate ? { x: [0, 100, 200], opacity: [1, 1, 0] } : { x: 0, opacity: 1 }
    };

    if (rotate && animate) {
        if (horizontal) animations.horizontal = { x: [0, -100, -200], opacity: [1, 1, 0] };
        else animations.vertical = { y: [0, -100, -200], opacity: [1, 1, 0] };
    }

    return (
        <motion.div
            className={`absolute ${position} ${horizontal ? 'w-4 h-2' : 'w-2 h-4'} bg-cyan-400 rounded-sm shadow z-10`}
            animate={horizontal ? animations.horizontal : animations.vertical}
            transition={animate ? { duration: 2, ease: "linear", repeat: Infinity, delay } : {}}
            style={rotate ? (horizontal ? { rotate: 180 } : {}) : {}}
        />
    );
}
