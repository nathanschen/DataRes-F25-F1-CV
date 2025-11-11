from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
import shutil

app = FastAPI()

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the uploads directory to serve video files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.post("/api/upload")
async def upload_video(video: UploadFile = File(...)):
    """
    Accept a video file upload and save it.
    In the future, this can trigger your inference pipeline.
    """
    try:
        # Save the uploaded file
        file_path = os.path.join(UPLOAD_DIR, video.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)
        
        # Return the URL where the video can be accessed
        video_url = f"http://localhost:8000/uploads/{video.filename}"
        return {"status": "ok", "video_url": video_url, "filename": video.filename}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/api/health")
def health():
    return {"status": "running"}
