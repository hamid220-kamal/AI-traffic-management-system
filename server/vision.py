import asyncio
import cv2
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from ultralytics import YOLO

vision_router = APIRouter()

# Load the YOLOv8 model
# 'yolov8n.pt' is the nano version, fast enough for CPU real-time inference
try:
    model = YOLO('yolov8n.pt') 
except Exception as e:
    print(f"Error loading YOLO model: {e}")
    model = None

# Using a public traffic camera HLS stream (e.g., Georgia DOT)
STREAM_URL = "https://sfs-msc-pub-lq-07.navigator.dot.ga.gov:443/rtplive/COBB-CCTV-AkersMillRd_OvertonParkDr-1030-E/playlist.m3u8"

async def generate_video_feed():
    """Reads from public M3U8, runs YOLOv8 inference, yields MJPEG bytes."""
    cap = cv2.VideoCapture(STREAM_URL)
    
    if not cap.isOpened():
        print("Failed to open video stream.")
        return

    # Frame skipping to manage CPU load
    frame_skip = 2
    frame_count = 0

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                # If stream fails, maybe try to reconnect or just break
                print("End of stream or error reading frame.")
                break
            
            frame_count += 1
            if frame_count % frame_skip != 0:
                continue

            # Resize frame for faster processing
            frame = cv2.resize(frame, (640, 360))

            if model:
                # Run YOLOv8 inference
                # classes=[2, 3, 5, 7] configures it to detect only vehicles (car, motorcycle, bus, truck)
                results = model(frame, classes=[2, 3, 5, 7], verbose=False)
                
                # Plot the bounding boxes on the frame
                annotated_frame = results[0].plot()
            else:
                annotated_frame = frame

            # Encode frame as JPEG
            ret, buffer = cv2.imencode('.jpg', annotated_frame)
            if not ret:
                continue

            frame_bytes = buffer.tobytes()

            # Yield the multipart payload
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
            
            # Small async sleep to prevent blocking the event loop entirely
            await asyncio.sleep(0.01)

    finally:
        cap.release()

@vision_router.get("/video_feed")
async def video_feed():
    """Endpoint serving the MJPEG multipart stream"""
    return StreamingResponse(
        generate_video_feed(), 
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

@vision_router.get("/vision_status")
async def vision_status():
    """Status endpoint the frontend can ping to get metadata"""
    return {
        "status": "active" if model else "error",
        "fps": 30 // 2, # Account for frame skip
        "model": "YOLOv8-Traffic (Nano)",
        "source": "GA DOT CCTV"
    }
