import os
import sys

print("Python executable:", sys.executable)
print("Current directory:", os.getcwd())
print("Files in current directory:", os.listdir())

try:
    from server.main import app
    print("Successfully imported app from server.main")
except Exception as e:
    print("Failed to import app:", e)
    import traceback
    traceback.print_exc()
