import React, { useState } from "react";
import { getUser, logout } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { 
  Eye, 
  BookOpen, 
  User, 
  LogOut, 
  Lock, 
  ShieldAlert, 
  Bookmark, 
  CheckCircle, 
  Star,
  FileText,
  Clock
} from "lucide-react";

function ViewerDashboard() {
  const user = getUser();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("content");
  const [bookmarks, setBookmarks] = useState([1]);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleBookmark = (id, title) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(b => b !== id));
      showToast(`Removed "${title}" from reading list.`);
    } else {
      setBookmarks([...bookmarks, id]);
      showToast(`Added "${title}" to your reading list!`);
    }
  };

  const publicArticles = [
    {
      id: 1,
      title: "Understanding Role-Based Access Control in React Applications",
      category: "Security",
      author: "Elena Rostova",
      readTime: "5 min read",
      date: "Aug 05, 2026",
      snippet: "Role-Based Access Control (RBAC) restricts navigation and component rendering according to signed JWT permissions..."
    },
    {
      id: 2,
      title: "JWT Authentication Workflow & Base64 Payload Extraction",
      category: "Authentication",
      author: "Alexander Vance",
      readTime: "7 min read",
      date: "Aug 02, 2026",
      snippet: "How JSON Web Tokens maintain state-less sessions using Base64 header and payload encoding alongside digital signatures..."
    },
    {
      id: 3,
      title: "Best Practices for Protected Routes with React Router v6",
      category: "React.js",
      author: "Elena Rostova",
      readTime: "4 min read",
      date: "Jul 28, 2026",
      snippet: "Learn how to wrap protected routes inside custom Higher-Order Components or custom wrapper functions for seamless redirects..."
    }
  ];

  return (
    <div className="dashboard-container">
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Viewer Header */}
      <div className="dashboard-header viewer-theme">
        <div className="header-badge">
          <Eye size={18} />
          <span>Viewer Access Level 1 (Read-Only) &bull; SAM FAWAZ ALBASARA (24BAI70236)</span>
        </div>
        <h1>Viewer Portal & Knowledge Base</h1>
        <p>Explore technical documentation, browse security reports, and view personal profile settings.</p>

        <div className="permission-info-banner">
          <Lock size={16} />
          <span><strong>Read-Only Permission Mode:</strong> Administrative settings and content editing functions are restricted for your role.</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <div className="sidebar-section-title">Viewer Portal</div>
          <button 
            className={`sidebar-nav-btn ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            <BookOpen size={18} />
            <span>View Content</span>
          </button>
          
          <button 
            className={`sidebar-nav-btn ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            <FileText size={18} />
            <span>Public Reports</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} />
            <span>My Profile</span>
          </button>

          <div className="sidebar-divider"></div>

          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout Account</span>
          </button>
        </aside>

        <main className="dashboard-content">
          {activeTab === "content" && (
            <div className="content-card">
              <h2>Published Knowledge Base Articles</h2>
              <p className="subtitle">Browse technical articles verified by Editors and Administrators</p>

              <div className="articles-feed">
                {publicArticles.map((art) => (
                  <div key={art.id} className="article-feed-card">
                    <div className="feed-card-header">
                      <span className="category-tag">{art.category}</span>
                      <button 
                        className={`bookmark-btn ${bookmarks.includes(art.id) ? "active" : ""}`}
                        onClick={() => toggleBookmark(art.id, art.title)}
                        title="Save to Reading List"
                      >
                        <Bookmark size={16} />
                      </button>
                    </div>

                    <h3 className="feed-title">{art.title}</h3>
                    <p className="feed-snippet">{art.snippet}</p>

                    <div className="feed-footer">
                      <div className="author-info">
                        <span className="author-name">By {art.author}</span>
                        <span className="dot">&bull;</span>
                        <span className="read-time"><Clock size={12} /> {art.readTime}</span>
                      </div>

                      {/* Dynamic permission button: Disabled for Viewer */}
                      <button className="disabled-action-btn" title="Editing requires Editor or Admin permissions">
                        <Lock size={14} />
                        <span>Edit (Restricted)</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="content-card">
              <h2>System Security Reports (Public Summary)</h2>
              <p className="subtitle">High-level status overview of application security and RBAC enforcement</p>

              <div className="report-summary-cards">
                <div className="report-box">
                  <h4>RBAC Policy Compliance</h4>
                  <div className="percentage">100% Secure</div>
                  <p>All sensitive routes strictly require signed authorization tokens.</p>
                </div>

                <div className="report-box">
                  <h4>Active Roles Supported</h4>
                  <div className="roles-list">
                    <span className="role-pill admin">Admin</span>
                    <span className="role-pill editor">Editor</span>
                    <span className="role-pill viewer">Viewer</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="content-card">
              <h2>User Profile & Session Details</h2>
              <p className="subtitle">Information retrieved from current JWT session payload</p>

              <div className="profile-details-grid">
                <div className="profile-avatar-large">
                  <img src={user?.avatar || "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150"} alt={user?.name} />
                </div>

                <div className="profile-info-fields">
                  <div className="profile-field">
                    <label>Full Name</label>
                    <div className="field-value">{user?.name || "Marcus Chen"}</div>
                  </div>

                  <div className="profile-field">
                    <label>Username</label>
                    <div className="field-value"><code>{user?.username || "viewer"}</code></div>
                  </div>

                  <div className="profile-field">
                    <label>Assigned Permission Role</label>
                    <div className="field-value"><span className="role-pill viewer">{user?.role || "Viewer"}</span></div>
                  </div>

                  <div className="profile-field">
                    <label>Email Address</label>
                    <div className="field-value">{user?.email || "viewer@enterprise.com"}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ViewerDashboard;
