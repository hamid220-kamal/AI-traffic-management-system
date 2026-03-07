import React, { useEffect, useState } from 'react';
import { Activity, TrendingUp, AlertTriangle, Car } from 'lucide-react';
import LiveIntersection from './Overview/LiveIntersection';
import SignalStatus from './Overview/SignalStatus';

export default function Overview() {
    const [stats, setStats] = useState({
        sessions: 106,
        vehicles: 102,
        avg: 10.2,
        alerts: 5
    });

    // Simulate real-time updates occasionally (performance friendly)
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                vehicles: prev.vehicles + Math.floor(Math.random() * 3),
                sessions: prev.sessions + (Math.random() > 0.8 ? 1 : 0),
                alerts: prev.alerts + (Math.random() > 0.95 ? 1 : 0)
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="card border-l-4 border-l-cyan-500">
                <h2 className="text-3xl font-bold text-white mb-2">SMART TRAFFIC COMMAND</h2>
                <p className="text-slate-400 mb-6 max-w-2xl">
                    AI-powered urban traffic management system using YOLOv8 vehicle detection
                    and reinforcement learning-based signal optimization.
                </p>
                <div className="flex flex-wrap gap-4">
                    <span className="badge-primary">YOLOv8 DETECTION</span>
                    <span className="badge-primary border-slate-700 text-slate-300">OPENAI GPT-4O</span>
                    <span className="badge-success">REAL-TIME PROCESSING</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Sessions', value: stats.sessions, icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
                    { label: 'Vehicles Detected', value: stats.vehicles, icon: Car, color: 'text-indigo-400', bg: 'bg-indigo-500/20' },
                    { label: 'Avg Per Session', value: ((stats.vehicles / stats.sessions) || 10.2).toFixed(1), icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
                    { label: 'Last 24H', value: stats.alerts, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/20' }
                ].map((stat, i) => (
                    <div key={i} className="card flex flex-col pb-8 transform transition-transform duration-300 hover:scale-105">
                        <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
                        <p className="text-4xl font-bold text-white tracking-tight">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="card lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-cyan-500" />
                        <h3 className="text-lg font-semibold text-white">Live Intersection - HITEC_JN_01</h3>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4 h-[400px] flex items-center justify-center border border-slate-700/50">
                        <LiveIntersection />
                    </div>
                </div>
                <div className="card flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-6">Signal Status</h3>
                    <SignalStatus />
                </div>
            </div>
        </div>
    );
}
