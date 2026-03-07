import React, { useState } from 'react';
import { MessageSquare, Send, Zap, AlertTriangle, AlertCircle, BarChart2, BrainCircuit, CloudRain, Info } from 'lucide-react';

export default function TrafficAI() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: "👋 Hello! I'm **Traffic Flow AI**, your intelligent traffic assistant.\n\nI have real-time access to:\n• Queue lengths & wait times per lane\n• Signal phase & RL agent decisions\n• Emergency vehicle status\n• Traffic violation alerts\n\nAsk me anything about traffic management, signal optimization, or violation handling! 🚥",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const newMsg = {
            id: Date.now(),
            sender: 'user',
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        setMessages(prev => [...prev, newMsg]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: `I've analyzed your request regarding: "${newMsg.text}".\n\nBased on current real-time data from HITEC_JN_01, the system is dynamically adjusting standard timing by +12% for the E-W corridor to alleviate minor congestion buildup. Confidence score: 92%.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            }]);
        }, 1500);
    };

    const quickPrompts = [
        { text: "Which lane has the worst congestion?", icon: AlertCircle, color: "text-red-500" },
        { text: "What is the emergency vehicle status?", icon: AlertTriangle, color: "text-red-400" },
        { text: "How should I handle wrong-way vehicles?", icon: AlertTriangle, color: "text-amber-500" },
        { text: "Analyze current signal phase", icon: BarChart2, color: "text-indigo-400" },
        { text: "Explain the RL agent decision", icon: BrainCircuit, color: "text-pink-500" },
        { text: "Rain protocol for traffic management", icon: CloudRain, color: "text-blue-400" }
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col gap-4">
                <div className="flex-1 card chat-scroll overflow-y-auto space-y-6">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-xl ${msg.sender === 'user' ? 'bg-slate-700/50 text-white rounded-br-sm' : 'bg-slate-900 border border-slate-700/50 text-slate-300 rounded-bl-sm'}`}>
                                {msg.sender === 'ai' && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                        <span className="text-xs font-bold text-emerald-500 tracking-wider">TRAFFIC FLOW AI</span>
                                        <span className="text-xs text-slate-500 ml-auto">{msg.timestamp}</span>
                                    </div>
                                )}
                                {msg.sender === 'user' && (
                                    <div className="flex justify-end mb-1">
                                        <span className="text-xs text-slate-400">{msg.timestamp}</span>
                                    </div>
                                )}
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {/* Basic markdown parsing hack for bold */}
                                    {msg.text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSend} className="card !p-4 flex gap-4 bg-slate-900 border-slate-700/50 shadow-lg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything about traffic management..."
                        className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 focus:ring-0"
                    />
                    <button type="submit" className="btn bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 flex items-center gap-2">
                        <Send className="w-4 h-4" /> <span className="hidden sm:inline">Send</span>
                    </button>
                </form>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 flex flex-col gap-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <Zap className="text-cyan-500 w-5 h-5 fill-cyan-500" /> Quick Prompts
                </h3>
                <div className="space-y-3 overflow-y-auto chat-scroll pr-2">
                    {quickPrompts.map((prompt, i) => (
                        <button
                            key={i}
                            onClick={() => setInput(prompt.text)}
                            className="w-full text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors rounded-lg p-4 flex items-start gap-3 group"
                        >
                            <prompt.icon className={`w-5 h-5 mt-0.5 ${prompt.color} flex-shrink-0 group-hover:scale-110 transition-transform`} />
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                {prompt.text}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-auto bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                    <div className="flex gap-3">
                        <Info className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-1">AI Assistant</h4>
                            <p className="text-xs text-slate-400">Traffic Flow AI has real-time access to intersection data and can help with signal optimization and violation management.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
