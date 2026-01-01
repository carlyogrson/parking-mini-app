import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromHost } from "./lib/hostToken.js";
import { authWithSuperQi } from "./lib/api.js";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromHost();
    if (token) {
      // If host provided a token, proceed to home
      localStorage.setItem("super_qi_token", token);
      navigate("/home");
    }
  }, [navigate]);

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    // store a temporary user session (no external auth)
    const user = { phone, plate };
    localStorage.setItem("super_qi_user", JSON.stringify(user));
    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 400);
  }

  function authenticate() {
    if (typeof window !== 'undefined' && window.my) {
      window.my.getAuthCode({
        scopes: ['auth_base', 'USER_ID'],
        success: (res) => {
          const code = res.authCode;
          setAuthCode(code);

          authWithSuperQi(code)
            .then(data => {
              // Store the token from API response, not the authCode
              const token = data.token;
              if (token) {
                localStorage.setItem("super_qi_token", token);
              }
              if (window.my && window.my.alert) {
                window.my.alert({
                  content: "Login successful",
                });
              }
              navigate("/home");
            })
            .catch(err => {
              let errorDetails = '';
              if (err && typeof err === 'object') {
                errorDetails = JSON.stringify(err, null, 2);
              } else {
                errorDetails = String(err);
              }
              if (window.my && window.my.alert) {
                window.my.alert({
                  content: "Error: " + errorDetails,
                });
              }
            });
        },
        fail: (res) => {
          console.log(res.authErrorScopes);
        },
      });
    }
  }

  function copyAuthCode() {
    if (authCode && navigator.clipboard) {
      navigator.clipboard.writeText(authCode);
    }
  }

  return (
    <main className="container">
      <h1>Super Qi — Parking Mini</h1>
      <section className="card">
        <form onSubmit={submit} className="form">
          <label>Phone number</label>
          <input
            inputMode="tel"
            pattern="[0-9]*"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="0770xxxxxxx"
            required
          />

          <label>Vehicle plate</label>
          <input
            value={plate}
            onChange={e => setPlate(e.target.value)}
            placeholder="ABC-1234"
          />

          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Start"}
          </button>
        </form>

        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button 
            className="primary" 
            onClick={authenticate}
            style={{ marginBottom: '0.5rem', width: '100%' }}
          >
            Login with Auth Code
          </button>
          {authCode && (
            <>
              <button 
                className="primary" 
                onClick={copyAuthCode}
                style={{ marginBottom: '0.5rem', width: '100%' }}
              >
                Copy Auth Code
              </button>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                Auth Code: <span>{authCode}</span>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
