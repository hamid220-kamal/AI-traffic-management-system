import { useState, useEffect } from 'react';

const WEBSOCKET_URL = "ws://localhost:8000/ws/traffic";

export function useTrafficData() {
    const [data, setData] = useState({
        timer: 45,
        phase: "N-S Turn",
        queue_normal: 45,
        ai_confidence: 92,
        epsilon: 0.05,
        total_reward: 12450,
        system_ticks: 842105,
        vehicles: {
            "N-S Turn": 5,
            "E-W Straight": 12,
            "S-W Turn": 3,
            "N-W Straight": 8
        }
    });

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        let ws;
        let reconnectTimer;

        const connect = () => {
            ws = new WebSocket(WEBSOCKET_URL);

            ws.onopen = () => {
                setIsConnected(true);
                console.log("Connected to Real-Time Traffic Engine");
            };

            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    if (message.type === 'TRAFFIC_UPDATE') {
                        setData(message.data);
                    }
                } catch (e) {
                    console.error("Failed to parse websocket message", e);
                }
            };

            ws.onclose = () => {
                setIsConnected(false);
                console.log("Disconnected from Traffic Engine, retrying in 3s...");
                reconnectTimer = setTimeout(connect, 3000);
            };

            ws.onerror = (err) => {
                console.error("WebSocket error observed:", err);
                ws.close();
            };
        };

        connect();

        return () => {
            clearTimeout(reconnectTimer);
            if (ws) {
                ws.onclose = null; // Prevent reconnect loop on unmount
                ws.close();
            }
        };
    }, []);

    return { data, isConnected };
}
