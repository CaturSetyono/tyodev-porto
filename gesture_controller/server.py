import cv2
import mediapipe as mp
import asyncio
import websockets
import json
import time
import threading

# MediaPipe setup (Max 2 hands now)
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7,
    max_num_hands=2
)
mp_draw = mp.solutions.drawing_utils

# Tracking Variables
last_cube_gesture_time = 0
COOLDOWN_CUBE = 0.5 

# VELOCITY-BASED THRESHOLDS (Speed instead of distance)
VELOCITY_THRESHOLD_CUBE = 1.0  # pixels normalized per second (very fast flick)

# Store recent positions to calculate velocity
cube_history = []  # List of (x, y, time)

command_queue = []
state_lock = threading.Lock()

# EMA smoothing for the camera
smooth_cam_x, smooth_cam_y = 0.5, 0.5

def process_frame(frame):
    global last_cube_gesture_time, cube_history
    global smooth_cam_x, smooth_cam_y
    
    frame = cv2.cvtColor(cv2.flip(frame, 1), cv2.COLOR_BGR2RGB)
    frame.flags.writeable = False
    results = hands.process(frame)
    frame.flags.writeable = True
    frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
    
    current_time = time.time()
    
    left_hand = None
    right_hand = None

    if results.multi_hand_landmarks and results.multi_handedness:
        for idx, hand_handedness in enumerate(results.multi_handedness):
            label = hand_handedness.classification[0].label
            landmarks = results.multi_hand_landmarks[idx]
            
            mp_draw.draw_landmarks(frame, landmarks, mp_hands.HAND_CONNECTIONS)
            
            # Using Palm (Middle Finger MCP - Landmark 9)
            palm = landmarks.landmark[9]
            
            if label == "Right":  # Flipped, physical LEFT hand
                left_hand = palm
            elif label == "Left": # Flipped, physical RIGHT hand
                right_hand = palm

    # --- LEFT HAND -> CUBE ROTATION (Velocity Flick) ---
    if left_hand:
        x, y = left_hand.x, left_hand.y
        cube_history.append((x, y, current_time))
        
        # Keep only last 0.15 seconds of history for crisp flicks
        cube_history = [h for h in cube_history if current_time - h[2] < 0.15]
        
        if len(cube_history) >= 2 and (current_time - last_cube_gesture_time > COOLDOWN_CUBE):
            oldest = cube_history[0]
            dx = x - oldest[0]
            dy = y - oldest[1]
            dt = current_time - oldest[2]
            
            vx = dx / dt if dt > 0 else 0
            vy = dy / dt if dt > 0 else 0
            
            gesture = None
            if abs(vx) > VELOCITY_THRESHOLD_CUBE and abs(vx) > abs(vy):
                gesture = "CUBE_SWIPE_RIGHT" if vx > 0 else "CUBE_SWIPE_LEFT"
            elif abs(vy) > VELOCITY_THRESHOLD_CUBE and abs(vy) > abs(vx):
                gesture = "CUBE_SWIPE_DOWN" if vy > 0 else "CUBE_SWIPE_UP"
            
            if gesture:
                print(f"Flick Detected: {gesture} (vx:{vx:.2f}, vy:{vy:.2f})")
                last_cube_gesture_time = current_time
                cube_history = []  # Reset history to prevent double trigger
                with state_lock:
                    command_queue.append({"type": "GESTURE", "command": gesture})
    else:
        cube_history = []

    # --- RIGHT HAND -> CAMERA MOVEMENT (Continuous Joystick tracking) ---
    if right_hand:
        x, y = right_hand.x, right_hand.y
        # Soften the jitter with Exponential Moving Average (EMA)
        smooth_cam_x = (0.7 * smooth_cam_x) + (0.3 * x)
        smooth_cam_y = (0.7 * smooth_cam_y) + (0.3 * y)
        
        # Queue continuous position stream
        with state_lock:
            command_queue.append({"type": "CAM_POS", "x": smooth_cam_x, "y": smooth_cam_y})
        
    return frame

async def websocket_handler(websocket):
    print("Next.js Client connected to WebSocket!")
    try:
        while True:
            gestures = []
            with state_lock:
                if command_queue:
                    # If multiple CAM_POS in queue, we just need the latest one to reduce spam
                    latest_cam = None
                    filtered_cmds = []
                    for cmd in command_queue:
                        if cmd["type"] == "CAM_POS":
                            latest_cam = cmd
                        else:
                            filtered_cmds.append(cmd)
                            
                    if latest_cam:
                        filtered_cmds.append(latest_cam)
                        
                    gestures = list(filtered_cmds)
                    command_queue.clear()
            
            for cmd in gestures:
                payload = json.dumps(cmd)
                await websocket.send(payload)
                # print(f"Sent: {payload}")
            
            # Use very short sleep for smooth 60fps tracking
            await asyncio.sleep(0.016)
    except websockets.exceptions.ConnectionClosed:
        print("Next.js Client disconnected")

async def start_websocket_server():
    print("Starting WebSocket Server on ws://localhost:8765...")
    async with websockets.serve(websocket_handler, "localhost", 8765):
        await asyncio.Future()

def start_opencv():
    print("Starting OpenCV Webcam capture...")
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return

    while True:
        success, image = cap.read()
        if not success:
            continue
            
        processed_frame = process_frame(image)
        cv2.imshow('Dual Hand Pro Control', processed_frame)
        
        if cv2.waitKey(5) & 0xFF == 27:
            break
            
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    def run_async_server():
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(start_websocket_server())

    ws_thread = threading.Thread(target=run_async_server, daemon=True)
    ws_thread.start()
    
    try:
        start_opencv()
    except KeyboardInterrupt:
        pass
