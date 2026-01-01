import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "./lib/session.js";

function formatTime(s) {
  const hh = Math.floor(s / 3600).toString().padStart(2, "0");
  const mm = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
  const ss = Math.floor(s % 60).toString().padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function Active() {
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState(0);
  const [session, setSession] = useState(() => getSession());

  useEffect(() => {
    const s = getSession();
    setSession(s);
    if (!s) {
      navigate("/");
      return;
    }
    const tick = () => {
      const now = Date.now();
      const secs = Math.floor((now - s.start) / 1000);
      setElapsed(secs);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [navigate]);

  function end() {
    navigate("/payment");
  }

  if (!session) return null;

  return (
    <div className="container">
      <h2>الموقف شغّال</h2>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="card-title">{session.spot}</div>
            <div className="card-sub">{session.pricePerHour} IQD / ساعة</div>
          </div>
          <span className="badge">Active</span>
        </div>

        <h3 style={{ marginTop: 12 }}>{formatTime(elapsed)}</h3>

        <button className="btn-primary" onClick={end}>
          إنهاء الموقف
        </button>
      </div>
    </div>
  );
}
