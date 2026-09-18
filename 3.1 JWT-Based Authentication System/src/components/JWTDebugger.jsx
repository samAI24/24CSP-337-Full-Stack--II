import React from 'react';
import { BookOpen, CheckCircle2, Layers, Cpu, Database, Server } from 'lucide-react';

export const JWTDebugger = () => {
  return (
    <div className="glass-card info-card">
      <div className="info-title">
        <BookOpen size={20} />
        <span>Experiment 3.1 - Theory & Learning Outcomes</span>
      </div>

      <div style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
        <strong>JWT Architecture:</strong> JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. Unlike traditional session cookies stored in a server database, JWTs enable <em>stateless authentication</em>.
      </div>

      <div className="info-title" style={{ fontSize: '0.95rem', color: 'var(--accent-purple)', marginTop: '20px' }}>
        <Layers size={18} />
        <span>JWT Structural Components</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '10px', borderLeft: '3px solid var(--jwt-header)' }}>
          <h4 style={{ color: 'var(--jwt-header)', fontSize: '0.85rem', marginBottom: '4px' }}>1. Header</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Specifies the signing algorithm (e.g. HS256) and token type (JWT).</p>
        </div>

        <div style={{ padding: '12px', background: 'rgba(168, 85, 247, 0.08)', borderRadius: '10px', borderLeft: '3px solid var(--jwt-payload)' }}>
          <h4 style={{ color: 'var(--jwt-payload)', fontSize: '0.85rem', marginBottom: '4px' }}>2. Payload</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Contains user claims such as username, email, role, and expiration timestamp.</p>
        </div>

        <div style={{ padding: '12px', background: 'rgba(6, 182, 212, 0.08)', borderRadius: '10px', borderLeft: '3px solid var(--jwt-signature)' }}>
          <h4 style={{ color: 'var(--jwt-signature)', fontSize: '0.85rem', marginBottom: '4px' }}>3. Signature</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verifies token integrity using secret key encryption to prevent tampering.</p>
        </div>
      </div>

      <div className="info-title" style={{ fontSize: '0.95rem', color: 'var(--accent-emerald)' }}>
        <CheckCircle2 size={18} />
        <span>Verified Learning Outcomes</span>
      </div>

      <ul className="info-list">
        <li>Understood token-based authentication mechanism in modern web applications.</li>
        <li>Implemented Base64 JWT generation with header, payload, and signature.</li>
        <li>Managed stateless user sessions with secure LocalStorage token persistence.</li>
        <li>Decoded and extracted user information on dashboard mounting.</li>
        <li>Handled error states for invalid login credentials cleanly.</li>
        <li>Implemented complete login, logout, and token revocation lifecycle.</li>
      </ul>
    </div>
  );
};
