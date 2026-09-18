import React, { useState } from 'react';
import { authenticateUser } from '../services/authService';
import { Lock, User, KeyRound, AlertCircle, Eye, EyeOff, Sparkles, LogIn } from 'lucide-react';

export const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setError('');

    const token = authenticateUser(username, password);

    if (token) {
      localStorage.setItem("token", token);
      login();
    } else {
      setError("Invalid Username or Password");
    }
  };

  const handleQuickFill = () => {
    setUsername('SamFawaz');
    setPassword('24BAI70236');
    setError('');
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-card login-box">
        <div className="login-header">
          <div className="login-icon-wrapper">
            <Lock size={28} />
          </div>
          <h2 className="login-title">JWT Login Portal</h2>
          <p className="login-subtitle">Enter credentials to issue a signed JSON Web Token</p>
        </div>

        {error && (
          <div className="error-alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="username-input">Username</label>
            <div className="input-relative">
              <User size={18} className="input-icon" />
              <input
                id="username-input"
                type="text"
                className="form-input"
                placeholder="Enter username (e.g., SamFawaz)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password-input">Password</label>
            <div className="input-relative">
              <KeyRound size={18} className="input-icon" />
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter password (e.g., 24BAI70236)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-pwd"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            <LogIn size={18} />
            Sign In & Issue JWT
          </button>
        </form>

        <button type="button" className="btn-demo" onClick={handleQuickFill}>
          <Sparkles size={16} /> Auto-fill Demo Credentials (SamFawaz / 24BAI70236)
        </button>
      </div>
    </div>
  );
};
