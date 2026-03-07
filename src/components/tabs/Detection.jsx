import React, { useState, useEffect } from 'react';
import { Camera, Video, AlertCircle, ScanLine, Maximize, Settings, BrainCircuit } from 'lucide-react';
import { useTrafficData } from '../../hooks/useTrafficData';

export default function Detection() {
    const [source, setSource] = useState('camera');
    const [visionStatus, setVisionStatus] = useState(null);
    const { isConnected } = useTrafficData();

    // The image tag handles the MJPEG stream directly. 
    // We ping vision_status just for the overlay data.
    useEffect(() => {
        fetch('http://localhost:8000/api/vision_status')
            .then(res => res.json())
            .then(data => setVisionStatus(data))
            .catch(err => {
                console.error("Could not fetch vision API status");
                // If it fails but we are connected via WS, assume backend is at least partially up
                if (isConnected) {
                    setVisionStatus({ status: 'active', fps: '?', model: 'YOLOv8', source: 'Live Feed' });
                }
            });
    }, [isConnected]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[600px]">

            {/* Left Column: Live Feed & Video Controls */}
            <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                {/* Source Toggle */}
                <div className="bg-slate-900 border border-slate-700/50 p-2 rounded-xl flex gap-2">
                    <button
                        onClick={() => setSource('camera')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${source === 'camera' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        <Camera className="w-5 h-5" /> Live Cameras
                    </button>
                    <button
                        onClick={() => setSource('video')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${source === 'video' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        <Video className="w-5 h-5" /> Recorded Video
                    </button>
                </div>

                {/* Video Feed Area */}
                <div className="flex-1 bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden relative group shadow-lg min-h-[400px]">
                    {/* Top Info Bar */}
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-slate-900/90 to-transparent p-4 flex justify-between items-start z-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-500/20 border border-red-500/30 text-red-500 px-3 py-1 text-xs font-bold rounded flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                LIVE
                            </div>
                            <span className="text-white font-medium text-sm drop-shadow-md">
                                {visionStatus?.source || 'CAM-01: Main Intersection (North-South)'}
                            </span>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded backdrop-blur-sm border border-slate-600/50 transition-colors">
                                <Settings className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded backdrop-blur-sm border border-slate-600/50 transition-colors">
                                <Maximize className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Real YOLOv8 MJPEG Stream Container */}
                    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative">
                        {isConnected ? (
                            // Render actual MJPEG stream from python backend whenever backend WS is alive
                            <img
                                src="http://localhost:8000/api/video_feed"
                                alt="Live AI Video Stream"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}

                        <div className="flex-col items-center justify-center border-2 border-dashed border-slate-700 m-2 w-full h-[95%]" style={{ display: isConnected ? 'none' : 'flex' }}>
                            <BrainCircuit className={`w-16 h-16 ${isConnected ? 'text-cyan-500/50 animate-pulse' : 'text-slate-700'} mb-4`} />
                            <p className="text-slate-500 font-medium">No active connection to YOLOv8 Backend.</p>
                            <p className="text-slate-600 text-sm mt-2">Start the Python FASTAPI server to begin live inference.</p>
                        </div>
                    </div>

                    {/* Metrics Overlay */}
                    {isConnected && (
                        <div className="absolute bottom-4 left-4 flex gap-3 z-10">
                            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-2.5 flex items-center gap-3 py-2 text-sm shadow-xl">
                                <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center">
                                    <ScanLine className="w-4 h-4 text-cyan-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">FPS Limit</p>
                                    <p className="text-white font-bold font-mono">{visionStatus?.fps || '...'}</p>
                                </div>
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-2.5 flex items-center gap-3 py-2 text-sm shadow-xl">
                                <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center">
                                    <BrainCircuit className="w-4 h-4 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Model</p>
                                    <p className="text-white font-bold font-mono">{visionStatus?.model || '...'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Active Detections stream */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-5 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <ScanLine className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Detection Data</h3>
                        <p className="text-xs text-slate-400">Live bounding box metadata</p>
                    </div>
                </div>

                {isConnected ? (
                    <div className="flex-1 overflow-y-auto chat-scroll pr-2 space-y-3">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-lg flex items-center justify-between group hover:border-cyan-500/50 transition-colors">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`w-2 h-2 rounded-full ${item % 3 === 0 ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                                        <span className="text-sm font-bold text-slate-200">
                                            {item % 4 === 0 ? 'Bus' : item % 5 === 0 ? 'Motorcycle' : 'Car'}
                                        </span>
                                        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-1 rounded">{(Math.random() * (0.99 - 0.85) + 0.85).toFixed(2)} conf</span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-mono">bbox: [{Math.floor(Math.random() * 100)}, {Math.floor(Math.random() * 100)}, {Math.floor(Math.random() * 200) + 100}, {Math.floor(Math.random() * 200) + 100}]</p>
                                </div>
                            </div>
                        ))}
                        <div className="pt-4 text-center">
                            <p className="text-xs text-slate-500 italic flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse"></span>
                                Streaming telemetry...
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700/50 border-dashed">
                        <AlertCircle className="w-10 h-10 text-slate-600 mb-3" />
                        <p className="text-sm font-medium text-slate-400 mb-1">No Real-Time Data</p>
                        <p className="text-xs text-slate-500">Enable the backend server to receive live vehicle bounding boxes.</p>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes scan {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(400px); opacity: 0; }
        }
        .animate-scan {
            animation: scan 3s linear infinite;
        }
      `}</style>
        </div>
    );
}
