import subprocess
import sys
import time

print("Starting backend launcher...")
with open("backend_log.txt", "w") as log_file:
    process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8000"],
        stdout=log_file,
        stderr=log_file,
        text=True
    )
    print(f"Backend process started with PID {process.pid}")
    time.sleep(10)
    print("Launcher finished waiting 10 seconds. Check backend_log.txt")
