import React from 'react';
import { ShieldAlert, AlertCircle, Clock } from 'lucide-react';
import { useTrafficData } from '../../../hooks/useTrafficData';

export default function SignalStatus() {
    const { data, isConnected } = useTrafficData();
    const { timer, phase, queue_normal, ai_confidence, epsilon, total_reward, system_ticks } = data;

    return (
        <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
                {/* Connection Status Banner (if offline) */}
                {!isConnected && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs px-3 py-1.5 rounded flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Connection to Real-Time Engine lost. Reconnecting...
                    </div>
                )}

                <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse shadow-[0_0_15px_3px_rgba(16,185,129,0.4)]' : 'bg-red-500'}`} />
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
                            Queue Density <span className="ml-auto text-cyan-400">{queue_normal}%</span>
                        </p>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                            <div className="bg-cyan-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${queue_normal}%` }}></div>
                        </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1 flex items-center">
                            AI Confidence <span className="ml-auto text-emerald-400">{ai_confidence}%</span>
                        </p>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                            <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${ai_confidence}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">RL Agent Metrics</h4>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Epsilon (Exploration)</span>
                        <span className="text-slate-300 font-mono">{epsilon}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Total Reward</span>
                        <span className="text-emerald-400 font-mono">+{total_reward.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">System Ticks</span>
                        <span className="text-slate-300 font-mono">{system_ticks.toLocaleString()}</span>
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
