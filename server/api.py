from fastapi import APIRouter
from pydantic import BaseModel
import random
import time

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.get("/analytics")
async def get_analytics():
    # Mock Database lookup for Analytics
    trafficData = [
      { "time": "0:00", "vehicles": random.randint(30, 80) },
      { "time": "1:00", "vehicles": random.randint(20, 60) },
      { "time": "2:00", "vehicles": random.randint(10, 40) },
      { "time": "3:00", "vehicles": random.randint(5, 20) },
      { "time": "4:00", "vehicles": random.randint(5, 15) },
      { "time": "5:00", "vehicles": random.randint(10, 30) },
      { "time": "6:00", "vehicles": random.randint(40, 100) },
      { "time": "7:00", "vehicles": random.randint(100, 200) },
      { "time": "8:00", "vehicles": random.randint(200, 350) },
      { "time": "9:00", "vehicles": random.randint(150, 300) }
    ]

    vehicleTypes = [
      { "name": "Car", "value": random.randint(50, 60), "color": "#06b6d4" },
      { "name": "Bus", "value": random.randint(10, 20), "color": "#3b82f6" },
      { "name": "Truck", "value": random.randint(5, 15), "color": "#a855f7" },
      { "name": "Motorcycle", "value": random.randint(10, 20), "color": "#f59e0b" },
      { "name": "Emergency", "value": random.randint(1, 5), "color": "#ef4444" }
    ]
    return {
        "status": "success",
        "data": {
            "traffic_pattern": trafficData,
            "distribution": vehicleTypes
        }
    }

@router.post("/chat")
async def traffic_ai_chat(req: ChatRequest):
    # Mock LLM Processing based on Real-Time state
    time.sleep(1.2) # Simulate network/processing latency
    
    responses = [
        f"I've analyzed your request: '{req.message}'. Based on current data, the reinforcement learning agent is favoring the N-S corridor to clear localized congestion. Confidence: 94%.",
        f"Regarding: '{req.message}'. The emergency vehicle detection protocol is active. All signals will preempt to clear the path if an emergency responder is detected in the zone.",
        f"Analyzing '{req.message}'... The queue lengths are currently balanced. System anomaly score is minimal. Epsilon values are stable at 0.05 indicating exploitation of known optimal policy."
    ]
    
    return {
        "status": "success",
        "response": random.choice(responses)
    }
