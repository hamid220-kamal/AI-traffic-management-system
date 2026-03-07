import React, { useState, Suspense, lazy } from 'react';
import { Activity, Camera, TrendingUp, MessageSquare } from 'lucide-react';

// Lazy loading content as per user rules.
const Overview = lazy(() => import('./tabs/Overview'));
const Detection = lazy(() => import('./tabs/Detection'));
const Analytics = lazy(() => import('./tabs/Analytics'));
const TrafficAI = lazy(() => import('./tabs/TrafficAI'));

const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'detection', label: 'Detection', icon: Camera },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'traffic-ai', label: 'Traffic AI', icon: MessageSquare },
];

export default function Layout() {
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <Overview />;
            case 'detection': return <Detection />;
            case 'analytics': return <Analytics />;
            case 'traffic-ai': return <TrafficAI />;
            default: return <Overview />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Header */}
            <header className="bg-slate-900 border-b border-slate-800">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-cyan-500 rounded p-2">
                            <Activity className="w-6 h-6 text-slate-900" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-white">SMART TRAFFIC COMMAND</h1>
                            <p className="text-sm text-slate-400">AI-DRIVEN URBAN TRAFFIC CONTROL</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-emerald-500 text-xs font-semibold tracking-wider">SYSTEM ONLINE</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="px-6 flex gap-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 border-b-2 font-medium transition-colors ${isActive
                                        ? 'border-cyan-400 text-cyan-400'
                                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-6 relative overflow-y-auto">
                <Suspense fallback={
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
                    </div>
                }>
                    {renderContent()}
                </Suspense>
            </main>
        </div>
    );
}
