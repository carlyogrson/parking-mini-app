import { useMemo, useState } from "react";
import { getSession, updateSession } from "./lib/session.js";
import { useNavigate } from "react-router-dom";
import { payWithSuperQi } from "./lib/api.js";

function calcAmount(session, elapsedSeconds) {
  const hours = Math.max(elapsedSeconds / 3600, 1/60); // minimum fraction
  return Math.ceil((session.pricePerHour * hours));
}

function QR({ payload }) {
  // simple placeholder QR box with encoded payload text
  return <div className="qr-box">{payload}</div>;
}

export default function Payment() {
  const navigate = useNavigate();
  const session = getSession();
  const [loading, setLoading] = useState(false);

  const elapsed = session ? Math.floor((Date.now() - session.start) / 1000) : 0;
  const amount = session ? calcAmount(session, elapsed) : 0;

  const payload = useMemo(() => {
    return JSON.stringify({ sessionId: session?.id, amount });
  }, [session, amount]);

  function handlePay() {
    setLoading(true);
    const token = localStorage.getItem("super_qi_token");
    
    if (!token) {
      setLoading(false);
      if (typeof window !== 'undefined' && window.my && window.my.alert) {
        window.my.alert({
          content: "Please login first",
        });
      } else {
        alert("Please login first");
      }
      return;
    }

    payWithSuperQi(token)
      .then(data => {
        if (typeof window !== 'undefined' && window.my && window.my.tradePay) {
          window.my.tradePay({
            paymentUrl: data.url,
            success: (res) => {
              updateSession({ paid: true, paidAt: Date.now(), amountPaid: amount });
              setLoading(false);
              if (window.my && window.my.alert) {
                window.my.alert({
                  content: "Payment successful",
                });
              }
              navigate("/success");
            },
            fail: (err) => {
              setLoading(false);
              if (window.my && window.my.alert) {
                window.my.alert({
                  content: "Payment failed",
                });
              }
            }
          });
        } else {
          setLoading(false);
          alert("Payment API not available");
        }
      })
      .catch(err => {
        setLoading(false);
        if (typeof window !== 'undefined' && window.my && window.my.alert) {
          window.my.alert({
            content: "Payment failed",
          });
        } else {
          alert("Payment failed");
        }
      });
  }

  if (!session) return (
    <div className="container"><div className="card">No active session.</div></div>
  );

  return (
    <div className="container">
      <h2>دفع الموقف</h2>

      <div className="card">
        <div className="card-title">{session.spot}</div>
        <div className="card-sub">الوقت: {Math.floor(elapsed/60)} دقيقة</div>
        <div style={{ marginTop: 8, fontWeight: 700 }}>{amount} IQD</div>

        <QR payload={btoa(payload)} />

        <p style={{ fontSize: 0.9, color: "var(--muted)" }}>Scan the barcode from the Qi app</p>

        <button className="btn-primary" onClick={handlePay} disabled={loading}>
          {loading ? "Processing…" : "I've paid"}
        </button>
      </div>
    </div>
  );
}
