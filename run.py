import os
import sys
import subprocess
import uvicorn

def main():
    print("==================================================")
    print("      Starting LeadDesk Mini Application          ")
    print("==================================================")
    print("Backend API running at:  http://127.0.0.1:8000")
    print("Interactive API Docs:    http://127.0.0.1:8000/docs")
    print("Admin Credentials:       admin@leaddesk.com / admin123")
    print("==================================================\n")

    sys.path.insert(0, os.path.abspath("backend"))
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

if __name__ == "__main__":
    main()
