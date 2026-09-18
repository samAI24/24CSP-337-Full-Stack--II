import React, { useState, useEffect } from 'react';
import { getUserFromToken, getFullTokenDetails } from '../utils/token';
import { User, Mail, Shield, LogOut, Copy, Check, Terminal, Cpu, Clock, Key } from 'lucide-react';

export const Dashboard = ({ logout }) => {
  const user = getUserFromToken();
  const tokenDetails = getFullTokenDetails();
  const [copied, setCopied] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyToken = () => {
    if (tokenDetails?.rawToken) {
      navigator.clipboard.writeText(tokenDetails.rawToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-grid">
        {/* User Profile Card */}
        <div className="glass-card profile-card">
          <div className="profile-header">
            <div className="avatar-circle">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="profile-info-title">
              <h2>{user?.username}</h2>
              <span className="role-tag">{user?.role}</span>
            </div>
          </div>

          <div className="profile-details-list">
            <div className="detail-row">
              <User size={18} className="detail-icon" />
              <div className="detail-text">
                <label>Username</label>
                <span>{user?.username}</span>
              </div>
            </div>

            <div className="detail-row">
              <Mail size={18} className="detail-icon" />
              <div className="detail-text">
                <label>Email Address</label>
                <span>{user?.email}</span>
              </div>
            </div>

            <div className="detail-row">
              <Shield size={18} className="detail-icon" />
              <div className="detail-text">
                <label>Access Role</label>
                <span>{user?.role}</span>
              </div>
            </div>

            <div className="detail-row">
              <Clock size={18} className="detail-icon" />
              <div className="detail-text">
                <label>Active Session Time</label>
                <span>{formatTime(sessionTime)}</span>
              </div>
            </div>
          </div>

          <button onClick={logout} className="btn-danger">
            <LogOut size={18} /> Terminate Session (Logout)
          </button>
        </div>

        {/* Live JWT Inspector Card */}
        <div className="glass-card inspector-card">
          <div className="card-title-row">
            <div className="card-title">
              <Key size={20} style={{ color: 'var(--accent-cyan)' }} />
              <span>Decoded JWT Token Details</span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Stateless LocalStorage Session
            </span>
          </div>

          {/* Raw JWT Token Display */}
          <div className="token-raw-box">
            <button className="btn-copy" onClick={handleCopyToken}>
              {copied ? <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Token'}
            </button>

            {tokenDetails ? (
              <>
                <span className="token-header-part">{tokenDetails.rawHeader}</span>
                <span className="token-dot">.</span>
                <span className="token-payload-part">{tokenDetails.rawPayload}</span>
                <span className="token-dot">.</span>
                <span className="token-signature-part">{tokenDetails.rawSignature}</span>
              </>
            ) : (
              <span>No Token Found</span>
            )}
          </div>

          {/* 3 JWT Part Cards */}
          <div className="jwt-parts-container">
            {/* Header */}
            <div className="jwt-part-box header-box">
              <div className="jwt-part-header">
                <span className="jwt-part-title header-title">Header: Algorithm & Token Type</span>
                <span className="code-block" style={{ fontSize: '0.75rem', color: 'var(--jwt-header)' }}>Base64Url</span>
              </div>
              <pre className="code-block">
                {tokenDetails ? JSON.stringify(tokenDetails.header, null, 2) : '{}'}
              </pre>
            </div>

            {/* Payload */}
            <div className="jwt-part-box payload-box">
              <div className="jwt-part-header">
                <span className="jwt-part-title payload-title">Payload: Decoded User Claims</span>
                <span className="code-block" style={{ fontSize: '0.75rem', color: 'var(--jwt-payload)' }}>Base64Url</span>
              </div>
              <pre className="code-block">
                {tokenDetails ? JSON.stringify(tokenDetails.payload, null, 2) : '{}'}
              </pre>
            </div>

            {/* Signature */}
            <div className="jwt-part-box signature-box">
              <div className="jwt-part-header">
                <span className="jwt-part-title signature-title">Signature: HMACSHA256 Verification</span>
                <span className="code-block" style={{ fontSize: '0.75rem', color: 'var(--jwt-signature)' }}>Base64Url</span>
              </div>
              <pre className="code-block">
                {tokenDetails ? tokenDetails.signature : 'jwt-signature'}
              </pre>
            </div>
          </div>

          {/* Bearer Header Representation */}
          <div className="bearer-preview">
            <span className="bearer-label">
              <Terminal size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Simulated API Authorization Request Header
            </span>
            <div className="bearer-code">
              Authorization: Bearer {tokenDetails?.rawToken || 'token'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
