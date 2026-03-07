import React, { useState } from 'react';
import { Camera, Video } from 'lucide-react';

export default function Detection() {
    const [source, setSource] = useState('camera');

    return (
        <div className="space-y-6">
            <div className="card flex items-center justify-between border-b-4 border-b-cyan-500 rounded-b-none">
                <div>
                    <h2 className="text-2xl font-bold text-white uppercase flex items-center gap-3">
                        <Camera className="text-cyan-500 w-8 h-8" /> VEHICLE DETECTION
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Real-time YOLOv8-based vehicle detection</p>
                </div>

                <div className="flex border border-slate-700 rounded-md overflow-hidden">
                    <button
                        onClick={() => setSource('camera')}
                        className={`px-4 py-2 flex items-center gap-2 transition-colors ${source === 'camera' ? 'bg-slate-800 text-cyan-400 border border-cyan-800/50' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                    >
                        <Camera className="w-4 h-4" /> Camera
                    </button>
                    <button
                        onClick={() => setSource('video')}
                        className={`px-4 py-2 flex items-center gap-2 transition-colors border-l border-slate-700 ${source === 'video' ? 'bg-slate-800 text-cyan-400 border border-cyan-800/50' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                    >
                        <Video className="w-4 h-4" /> Video File
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="card lg:col-span-2">
                    <h3 className="text-lg font-semibold text-white mb-4">Live Feed</h3>
                    <div className="bg-slate-900 rounded-lg aspect-video flex flex-col items-center justify-center border border-slate-700 border-dashed relative overflow-hidden group">

                        <div className="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center opacity-100 transition-opacity">
                            <Camera className="w-12 h-12 text-slate-600 mb-4" />
                            <p className="text-slate-400">No active detection</p>
                        </div>

                        {/* Scanned line animation */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-bounce" style={{ animationDuration: '3s' }} />
                    </div>
                </div>

                <div className="card flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-4">Current Detection</h3>

                    <div className="flex-1 flex items-center justify-center border border-slate-700 border-dashed rounded-lg mb-4 text-slate-500 text-sm">
                        No detection data yet
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-white mb-2">Session Info</h4>
                        <div className="space-y-1 text-sm">
                            <p className="flex justify-between text-slate-400">
                                <span>Session ID:</span> <span className="font-mono text-slate-300">N/A</span>
                            </p>
                            <p className="flex justify-between text-slate-400">
                                <span>Frames Processed:</span> <span className="font-mono text-slate-300">0</span>
                            </p>
                            <p className="flex justify-between text-slate-400">
                                <span>Status:</span> <span className="font-mono text-amber-500">IDLE</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
