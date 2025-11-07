from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class YouTubeLink(BaseModel):
    youtube_url: str

@app.post("/api/analyze")
def analyze_video(payload: YouTubeLink):
    """
    In the future, this endpoint will trigger your inference pipeline.
    For now, just returns the same YouTube URL.
    """
    return {"status": "ok", "video_url": payload.youtube_url}

@app.get("/api/health")
def health():
    return {"status": "running"}
