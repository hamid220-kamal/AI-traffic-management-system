import React from 'react';
import { TrendingUp, Activity, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

const trafficData = [
    { time: '0:00', vehicles: 60 },
    { time: '1:00', vehicles: 62 },
    { time: '2:00', vehicles: 61 },
    { time: '3:00', vehicles: 4 },
    { time: '4:00', vehicles: 0 },
    { time: '5:00', vehicles: 0 },
    { time: '6:00', vehicles: 0 },
    { time: '7:00', vehicles: 0 },
    { time: '8:00', vehicles: 0 },
    { time: '9:00', vehicles: 0 },
    { time: '12:00', vehicles: 0 },
    { time: '15:00', vehicles: 0 },
    { time: '18:00', vehicles: 0 },
    { time: '21:00', vehicles: 0 },
];

const vehicleTypes = [
    { name: 'Car', value: 57, color: '#06b6d4' },
    { name: 'Bus', value: 18, color: '#3b82f6' },
    { name: 'Truck', value: 9, color: '#a855f7' },
    { name: 'Motorcycle', value: 13, color: '#f59e0b' },
    { name: 'Emergency', value: 3, color: '#ef4444' },
];

export default function Analytics() {
    return (
        <div className="space-y-6">
            <div className="card border-l-4 border-l-cyan-500">
                <h2 className="text-3xl font-bold text-white uppercase flex items-center gap-3">
                    <TrendingUp className="text-cyan-500 w-8 h-8" /> TRAFFIC ANALYTICS
                </h2>
                <p className="text-slate-400 mt-2">Real-time traffic data and insights</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card h-[400px] flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity className="text-cyan-500 w-5 h-5" /> 24-HOUR TRAFFIC PATTERN
                        </h3>
                        <p className="text-sm text-slate-400">Vehicle count by hour</p>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                                    itemStyle={{ color: '#22d3ee' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="vehicles"
                                    stroke="#22d3ee"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#22d3ee', strokeWidth: 0 }}
                                    activeDot={{ r: 6, fill: '#06b6d4' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card h-[400px] flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity className="text-cyan-500 w-5 h-5" /> VEHICLE DISTRIBUTION
                        </h3>
                        <p className="text-sm text-slate-400">By vehicle type</p>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                                <Pie
                                    data={vehicleTypes}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {vehicleTypes.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                                />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
