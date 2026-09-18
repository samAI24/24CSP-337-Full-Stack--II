import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser, users } from "../services/authService";
import { ShieldCheck, Lock, User, Key, ArrowRight, Shield, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeAccountCard, setActiveAccountCard] = useState(null);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    const token = authenticateUser(username, password);

    if (!token) {
      setError("Invalid Username or Password");
      return;
    }

    // Store JWT token in LocalStorage
    localStorage.setItem("token", token);

    // Decode base64 payload from JWT string
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Redirect based on decoded user role
      if (payload.role === "Admin") {
        navigate("/admin");
      } else if (payload.role === "Editor") {
        navigate("/editor");
      } else {
        navigate("/viewer");
      }
    } catch (err) {
      setError("Failed to decode authentication token");
    }
  };

  const handleSelectQuickUser = (userObj) => {
    setUsername(userObj.username);
    setPassword(userObj.password);
    setActiveAccountCard(userObj.username);
    setError("");
  };

  return (
    <div className="login-page-container">
      <div className="login-gradient-bg"></div>

      <div className="login-content-wrapper">
        {/* Left Side: RBAC Information & System Overview */}
        <div className="login-hero-section">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Experiment 3.2 &bull; SAM FAWAZ ALBASARA &bull; UID: 24BAI70236</span>
          </div>

          <h1 className="hero-title">
            Role-Based Access Control <span className="gradient-text">(RBAC)</span>
          </h1>

          <p className="hero-description">
            Secure application route protection using JWT authorization payload verification. Access level permissions strictly control UI elements, navigation paths, and administrative actions.
          </p>

          {/* Quick Select Demo Accounts */}
          <div className="demo-accounts-container">
            <h3 className="demo-accounts-title">Select a Demo Role to Test:</h3>
            <div className="demo-accounts-grid">
              {users.map((u) => (
                <div
                  key={u.username}
                  className={`demo-card ${u.role.toLowerCase()} ${activeAccountCard === u.username ? "selected" : ""}`}
                  onClick={() => handleSelectQuickUser(u)}
                >
                  <div className="demo-card-header">
                    <span className={`role-pill ${u.role.toLowerCase()}`}>{u.role}</span>
                    {activeAccountCard === u.username && <CheckCircle2 size={16} className="check-icon" />}
                  </div>
                  <div className="demo-card-body">
                    <div className="demo-card-name">{u.name}</div>
                    <div className="demo-card-creds">
                      <code>{u.username}</code> / <code>{u.password}</code>
                    </div>
                  </div>
                  <p className="demo-card-desc">{u.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Glassmorphism Login Card */}
        <div className="login-card-container">
          <div className="login-glass-card">
            <div className="card-header">
              <div className="icon-circle">
                <ShieldCheck size={28} />
              </div>
              <h2>Portal Sign In</h2>
              <p>Authenticate credentials to generate JWT session token</p>
            </div>

            {error && (
              <div className="error-alert">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <div className="input-field-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    id="username"
                    type="text"
                    placeholder="e.g., admin, editor, viewer"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-field-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="login-submit-btn">
                <span>Authenticate & Access Route</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="security-notice">
              <Key size={14} />
              <span>JWT Signed with HS256 algorithm & encoded role payload</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
