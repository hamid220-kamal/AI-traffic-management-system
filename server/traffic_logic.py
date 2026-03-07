import asyncio
import random
from server.sockets import manager

# Initial State
state = {
    "timer": 45,
    "phase": "N-S Turn",
    "queue_normal": 45,
    "ai_confidence": 92,
    "epsilon": 0.05,
    "total_reward": 12450,
    "system_ticks": 842105,
    "vehicles": {
        "N-S Turn": 5,
        "E-W Straight": 12,
        "S-W Turn": 3,
        "N-W Straight": 8
    }
}

PHASES = ["N-S Turn", "E-W Straight", "S-W Turn", "N-W Straight"]

async def rl_traffic_simulation():
    """Background task to simulate reinforcement learning signal control and vehicle detection"""
    current_phase_idx = 0
    
    while True:
        await asyncio.sleep(1) # system tick
        
        state["system_ticks"] += 1
        state["timer"] -= 1
        
        # Simulate vehicles arriving
        for p in PHASES:
            if random.random() > 0.8:
                state["vehicles"][p] += random.randint(1, 3)
                
        # Simulate vehicles leaving on active phase
        if state["vehicles"][state["phase"]] > 0:
            state["vehicles"][state["phase"]] -= random.randint(1, 5)
            state["vehicles"][state["phase"]] = max(0, state["vehicles"][state["phase"]])

        # Dynamic phase switching based on RL logic (simplified)
        max_queue_phase = max(state["vehicles"], key=state["vehicles"].get)
        max_queue_length = state["vehicles"][max_queue_phase]
        
        # AI decision: If current queue is empty but another queue is huge, skip timer
        if state["vehicles"][state["phase"]] == 0 and max_queue_length > 15 and state["timer"] > 5:
            state["timer"] = 3 # Force phase change soon
            state["ai_confidence"] = random.randint(95, 99)
            state["total_reward"] += 50
        
        if state["timer"] <= 0:
            # Change phase logic
            if max_queue_length > 10 and max_queue_phase != state["phase"] and random.random() > state["epsilon"]:
                # Exploit phase with most cars
                state["phase"] = max_queue_phase
                current_phase_idx = PHASES.index(max_queue_phase)
            else:
                # Explore / Round Robin
                current_phase_idx = (current_phase_idx + 1) % len(PHASES)
                state["phase"] = PHASES[current_phase_idx]

            # Calculate new timer based on queue
            base_time = 30
            extra_time = min(20, state["vehicles"][state["phase"]] * 2)
            state["timer"] = base_time + extra_time
            state["total_reward"] += 15
            
        # Update queue visual percentage
        total_vehicles = sum(state["vehicles"].values())
        state["queue_normal"] = min(100, int((total_vehicles / 50) * 100))
        
        # Broadcast full state
        await manager.broadcast({
            "type": "TRAFFIC_UPDATE",
            "data": state
        })
