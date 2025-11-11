import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const videoRef = useRef(null);

  // Load video when URL changes
  useEffect(() => {
    if (videoRef.current && videoURL) {
      videoRef.current.load();
    }
  }, [videoURL]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      // Create a local URL for immediate preview
      const localURL = URL.createObjectURL(file);
      setVideoURL(localURL);
    } else {
      alert("Please select a valid video file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return;
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("video", videoFile);

      const res = await axios.post("http://localhost:8000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Update with server URL if needed
      if (res.data.video_url) {
        setVideoURL(res.data.video_url);
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading video");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 40 }}>
      <h1>🏎️ F1 Direction App (Prototype)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          style={{ padding: "8px" }}
        />
        <button 
          type="submit" 
          style={{ marginLeft: "10px", padding: "8px" }}
          disabled={!videoFile || uploading}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

      {videoURL && (
        <div style={{ marginTop: 40 }}>
          <h3>Video Player:</h3>
          <video
            ref={videoRef}
            width="720"
            height="405"
            controls
            style={{ backgroundColor: "#000" }}
            src={videoURL}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

