import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertCircle, Clock } from 'lucide-react';

export default function SignalStatus() {
    const [timer, setTimer] = useState(45);
    const [phase, setPhase] = useState('S-W Turn');

    useEffect(() => {
        const phases = ['N-S Turn', 'E-W Straight', 'S-W Turn', 'N-W Straight'];
        let currentPhaseIdx = 2; // Match initial phase

        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    currentPhaseIdx = (currentPhaseIdx + 1) % phases.length;
                    setPhase(phases[currentPhaseIdx]);
                    return 45; // Reset timer when phase changes
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_3px_rgba(16,185,129,0.4)]" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-400">Current Phase</p>
                            <p className="text-xl font-bold text-white transition-opacity duration-300">{phase}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-slate-400 flex items-center justify-end gap-1">
                            <Clock className="w-3 h-3" /> Time left
                        </p>
                        <p className={`text-2xl font-bold font-mono ${timer <= 5 ? 'text-amber-500 animate-pulse' : 'text-emerald-400'}`}>
                            00:{timer.toString().padStart(2, '0')}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1 flex items-center shadow-sm">
                            Queue Length <span className="ml-auto text-cyan-400">Normal</span>
                        </p>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                            <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1 flex items-center">
                            AI Confidence <span className="ml-auto text-emerald-400">92%</span>
                        </p>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">RL Agent Metrics</h4>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Epsilon (Exploration)</span>
                        <span className="text-slate-300 font-mono">0.05</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Total Reward</span>
                        <span className="text-emerald-400 font-mono">+12,450</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">System Ticks</span>
                        <span className="text-slate-300 font-mono">842,105</span>
                    </div>
                </div>
            </div>

            <button className="mt-6 w-full btn bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 py-3 flex items-center justify-center gap-2 group transition-all">
                <AlertCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Emergency Trigger
            </button>
        </div>
    );
}
