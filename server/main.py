from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import asyncio
from server.sockets import manager
from server.traffic_logic import rl_traffic_simulation
from server.api import router as api_router
from server.vision import vision_router

app = FastAPI(title="Smart Traffic Command API", description="Real-time backend for AI traffic management system")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")
app.include_router(vision_router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    # Start the background traffic simulation task
    asyncio.create_task(rl_traffic_simulation())

@app.websocket("/ws/traffic")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/")
async def root():
    return {"status": "online", "message": "Smart Traffic Command API is running."}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
