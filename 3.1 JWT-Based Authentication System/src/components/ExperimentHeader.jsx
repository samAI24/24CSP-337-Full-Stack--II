import React from 'react';
import { ShieldCheck, ShieldAlert, Award, User, BookOpen, Calendar, Hash } from 'lucide-react';

export const ExperimentHeader = ({ isLoggedIn }) => {
  return (
    <header className="glass-card exp-header">
      <div className="exp-header-top">
        <div className="exp-title-group">
          <span className="exp-badge">EXP 3.1</span>
          <div>
            <h1 className="exp-heading">JWT Authentication & Session Management</h1>
            <p className="exp-subheading">Stateless token-based authentication using React.js & LocalStorage</p>
          </div>
        </div>

        <div className={`status-badge ${isLoggedIn ? 'active' : 'inactive'}`}>
          <span className="status-dot"></span>
          {isLoggedIn ? (
            <>
              <ShieldCheck size={16} /> Authenticated (Session Active)
            </>
          ) : (
            <>
              <ShieldAlert size={16} /> Unauthenticated (Logged Out)
            </>
          )}
        </div>
      </div>

      <div className="student-grid">
        <div className="student-info-item">
          <span className="student-info-label">
            <User size={12} style={{ display: 'inline', marginRight: '4px' }} /> Student Name
          </span>
          <span className="student-info-value">Sam Fawaz Hadi AL-Basara</span>
        </div>

        <div className="student-info-item">
          <span className="student-info-label">
            <Hash size={12} style={{ display: 'inline', marginRight: '4px' }} /> UID & Branch
          </span>
          <span className="student-info-value">24BAI70236 (CSE-AIML)</span>
        </div>

        <div className="student-info-item">
          <span className="student-info-label">
            <BookOpen size={12} style={{ display: 'inline', marginRight: '4px' }} /> Subject & Code
          </span>
          <span className="student-info-value">Full Stack - II (24CSP-337)</span>
        </div>

        <div className="student-info-item">
          <span className="student-info-label">
            <Award size={12} style={{ display: 'inline', marginRight: '4px' }} /> Section / Group
          </span>
          <span className="student-info-value">24AIT_NTPP2[A] (5th Sem)</span>
        </div>

        <div className="student-info-item">
          <span className="student-info-label">
            <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} /> Performance Date
          </span>
          <span className="student-info-value">22/07/2026</span>
        </div>
      </div>
    </header>
  );
};
