import { useRef, useState } from "react";
import { LiveAvatarSession } from "@heygen/liveavatar-web-sdk";
import "./App.css";

interface Report {
  overallScore: number;
  overallFeedback: string;
}
interface InterviewResult {
  report: Report;
  transcriptData: string;
}
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  console.log("App rendered");
  const avatarRef = useRef<HTMLVideoElement>(null);

  const [session, setSession] = useState<LiveAvatarSession | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState("Disconnected");
  const [result, setResult] = useState<Report | null>(null);
  const [transcriptData, setTranscriptData] = useState<string | null>(null);

  const registerEvents = (liveSession: LiveAvatarSession) => {
    liveSession.on("connected", () => {
      console.log("Connected");
      setStatus("Connected");
    });

    liveSession.on("disconnected", () => {
      console.log("Disconnected");
      setStatus("Disconnected");
    });

    liveSession.on("error", (e: unknown) => {
      console.error(e);
      setStatus("Error");
    });
  };

  const getTranscript = async (id: string) => {
    const response = await fetch(
      `${API_URL}/session-transcript/${id}`,
    );

    const data: InterviewResult = await response.json();
    setResult(data.report);
    setTranscriptData(data.transcriptData);
    return data;
  };

  const startInterview = async () => {
    try {
      console.log(`Creating Session...${API_URL}/token`);
      setStatus(`Creating Session...`);

      const response = await fetch(`${API_URL}/token`, {
        method: "POST",
      });

      const data = await response.json();

      const id = data.data.session_id;
      setSessionId(id);

      const liveSession = new LiveAvatarSession(data.data.session_token, {
        voiceChat: true,
      });

      registerEvents(liveSession);

      await liveSession.start();

      if (avatarRef.current) {
        liveSession.attach(avatarRef.current);
      }

      setSession(liveSession);
      setStatus("Connected");

      console.log("Connected", id);
    } catch (error) {
      console.error(error);
      setStatus("Error");
    }
  };

  const getScore = async () => {
    if (!session || !sessionId) return;

    try {
      const data = await getTranscript(sessionId);
      console.log("Interview Result:", data);
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }

    await session.stop();
    setStatus("Interview Ended");
  };

  const downloadTranscript = async () => {
    if (!session || !sessionId || !transcriptData) return;

    const blob = new Blob([transcriptData], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${sessionId}.txt`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Interview</h2>

      <p className="status">
        <strong>Status:</strong> {status}
      </p>

      <div className="video-container">
        <video
          ref={avatarRef}
          autoPlay
          playsInline
          style={{ border: "1px solid #ccc" }}
        />
      </div>

      <button onClick={startInterview}>Start Interview</button>

      <button onClick={getScore} style={{ marginLeft: 10 }}>
        Get Score
      </button>

      {transcriptData && (
        <button onClick={downloadTranscript} style={{ marginLeft: 10 }}>
          Get Transcript
        </button>
      )}

      {result && (
        <div style={{ marginTop: 20 }}>
          <hr />
          <h2>Interview Result</h2>
          <p>
            <strong>Score:</strong> {result.overallScore}
          </p>
          <p>
            <strong>Conclusion:</strong> {result.overallFeedback}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
