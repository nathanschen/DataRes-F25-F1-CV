import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [youtubeURL, setYoutubeURL] = useState("");
  const [videoURL, setVideoURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!youtubeURL) return;
    try {
      const res = await axios.post("http://localhost:8000/api/analyze", {
        youtube_url: youtubeURL,
      });
      setVideoURL(res.data.video_url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 40 }}>
      <h1>🏎️ F1 Direction App (Prototype)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Paste YouTube URL"
          value={youtubeURL}
          onChange={(e) => setYoutubeURL(e.target.value)}
          style={{ width: "400px", padding: "8px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "8px" }}>
          Submit
        </button>
      </form>

      {videoURL && (
        <div style={{ marginTop: 40 }}>
          <h3>Video:</h3>
          <iframe
            width="720"
            height="405"
            src={videoURL.replace("watch?v=", "embed/")}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

