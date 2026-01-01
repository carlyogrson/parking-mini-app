import { getSession, clearSession } from "./lib/session.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const [session, setSession] = useState(() => getSession());
  const navigate = useNavigate();

  useEffect(() => {
    // keep the session summary visible briefly, then clear
    const t = setTimeout(() => {
      clearSession();
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  if (!session) return (
    <div className="container"><div className="card">No session found.</div></div>
  );

  return (
    <div className="container">
      <h2>تم الدفع</h2>

      <div className="card">
        <div className="card-title">{session.spot}</div>
        <div className="card-sub">وقت البدء: {new Date(session.start).toLocaleString()}</div>
        <div style={{ marginTop: 8 }}><strong>المبلغ:</strong> {session.amountPaid || 0} IQD</div>

        <button className="secondary" onClick={() => navigate("/home")}>العودة للقائمة</button>
      </div>
    </div>
  );
}
