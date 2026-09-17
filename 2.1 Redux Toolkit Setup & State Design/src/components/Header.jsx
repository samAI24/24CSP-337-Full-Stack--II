import React from 'react';
import { useSelector } from 'react-redux';
import { Sparkles, Layers, FileText, CheckCircle2 } from 'lucide-react';

const Header = () => {
  const posts = useSelector((state) => state.posts.posts || []);

  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.status === 'Published').length;
  const draftCount = posts.filter((p) => p.status === 'Draft').length;

  return (
    <header className="header-card">
      <div className="header-top">
        <div className="header-badge">
          <Sparkles size={14} className="badge-icon" />
          <span>Experiment 2.1 — Redux Toolkit Centralized State</span>
        </div>
        <div className="student-pill">
          <span className="student-name">Sam Fawaz Hadi Ali AL-Basara</span>
          <span className="student-uid">24BAI70236</span>
        </div>
      </div>

      <div className="header-main">
        <div>
          <h1 className="header-title">Social Post & Platform Centralized Store</h1>
          <p className="header-subtitle">
            CSE – AIML (CS221) | 5th Sem | Subject: Full Stack-II (24CSP-337) | Group: 24AIT_NTPP-2A
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap total">
            <Layers size={18} />
          </div>
          <div>
            <div className="stat-value">{totalPosts}</div>
            <div className="stat-label">Total Posts in Store</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap published">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div className="stat-value">{publishedCount}</div>
            <div className="stat-label">Published Posts</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap draft">
            <FileText size={18} />
          </div>
          <div>
            <div className="stat-value">{draftCount}</div>
            <div className="stat-label">Active Drafts</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
