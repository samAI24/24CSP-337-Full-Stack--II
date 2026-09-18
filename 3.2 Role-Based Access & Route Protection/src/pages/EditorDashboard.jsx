import React, { useState } from "react";
import { getUser, logout } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { 
  FileEdit, 
  BookOpen, 
  BarChart2, 
  LogOut, 
  PlusCircle, 
  CheckCircle, 
  Eye, 
  Clock, 
  Edit3, 
  Trash2, 
  Image, 
  Sparkles,
  Send
} from "lucide-react";

function EditorDashboard() {
  const user = getUser();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Understanding Role-Based Access Control in React Applications",
      category: "Security",
      status: "Published",
      author: "Elena Rostova",
      updatedAt: "Today, 14:20",
      views: 1420
    },
    {
      id: 2,
      title: "Securing Client-Side Routes with Custom JWT Middleware",
      category: "Architecture",
      status: "Review",
      author: "Elena Rostova",
      updatedAt: "Yesterday, 09:15",
      views: 840
    },
    {
      id: 3,
      title: "Optimizing State Selectors in Complex Dashboards",
      category: "Performance",
      status: "Draft",
      author: "Elena Rostova",
      updatedAt: "3 days ago",
      views: 0
    }
  ]);

  const [activeTab, setActiveTab] = useState("content");
  const [toastMessage, setToastMessage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Security");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateArticle = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newArt = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      status: "Draft",
      author: user?.name || "Elena Rostova",
      updatedAt: "Just now",
      views: 0
    };

    setArticles([newArt, ...articles]);
    setNewTitle("");
    showToast(`New article "${newArt.title}" draft created!`);
  };

  const handleToggleStatus = (id) => {
    setArticles(articles.map(art => {
      if (art.id === id) {
        const nextStatus = art.status === "Draft" ? "Review" : art.status === "Review" ? "Published" : "Draft";
        return { ...art, status: nextStatus };
      }
      return art;
    }));
    showToast("Article status workflow updated.");
  };

  const handleDeleteArticle = (id, title) => {
    setArticles(articles.filter(art => art.id !== id));
    showToast(`Article "${title}" removed.`);
  };

  return (
    <div className="dashboard-container">
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Editor Header */}
      <div className="dashboard-header editor-theme">
        <div className="header-badge">
          <Edit3 size={18} />
          <span>Editor Workspace Level 2 &bull; SAM FAWAZ ALBASARA (24BAI70236)</span>
        </div>
        <h1>Content & Article Publishing Hub</h1>
        <p>Manage digital content workflow, draft technical articles, view publication analytics, and curate platform media.</p>

        <div className="admin-stats-grid">
          <div className="stat-card">
            <div className="stat-icon content-icon"><BookOpen size={20} /></div>
            <div className="stat-data">
              <span className="stat-value">{articles.length} Articles</span>
              <span className="stat-label">Total Content</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon published-icon"><Sparkles size={20} /></div>
            <div className="stat-data">
              <span className="stat-value">{articles.filter(a => a.status === "Published").length} Live</span>
              <span className="stat-label">Published Articles</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon views-icon"><Eye size={20} /></div>
            <div className="stat-data">
              <span className="stat-value">2,260</span>
              <span className="stat-label">Total Content Views</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <div className="sidebar-section-title">Editor Actions</div>
          <button 
            className={`sidebar-nav-btn ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            <BookOpen size={18} />
            <span>Manage Content</span>
          </button>
          
          <button 
            className={`sidebar-nav-btn ${activeTab === "create" ? "active" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            <PlusCircle size={18} />
            <span>Create Article</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            <BarChart2 size={18} />
            <span>Content Analytics</span>
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
              <div className="card-top-bar">
                <div>
                  <h2>Article Pipeline & Workflow</h2>
                  <p className="subtitle">Draft, review, and publish technical documentation</p>
                </div>
                <button className="primary-action-btn editor" onClick={() => setActiveTab("create")}>
                  <PlusCircle size={16} />
                  <span>Draft New Post</span>
                </button>
              </div>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Last Updated</th>
                      <th>Views</th>
                      <th>Workflow Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((a) => (
                      <tr key={a.id}>
                        <td><strong>{a.title}</strong></td>
                        <td><span className="category-tag">{a.category}</span></td>
                        <td>
                          <button 
                            className={`status-pill ${a.status.toLowerCase()}`}
                            onClick={() => handleToggleStatus(a.id)}
                            title="Click to advance status: Draft -> Review -> Published"
                          >
                            {a.status}
                          </button>
                        </td>
                        <td>{a.updatedAt}</td>
                        <td>{a.views}</td>
                        <td>
                          <div className="action-buttons-group">
                            <button 
                              className="icon-btn edit"
                              onClick={() => showToast(`Opening editor for "${a.title}"`)}
                              title="Edit Article"
                            >
                              <FileEdit size={16} />
                            </button>
                            <button 
                              className="icon-btn delete"
                              onClick={() => handleDeleteArticle(a.id, a.title)}
                              title="Delete Draft"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "create" && (
            <div className="content-card">
              <h2>Article Creation Suite</h2>
              <p className="subtitle">Draft new content with custom tags and permissions</p>
              
              <form onSubmit={handleCreateArticle} className="editor-create-form">
                <div className="input-group">
                  <label>Article Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Implementing JWT & Protected Routes in React" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Topic Category</label>
                  <select 
                    className="custom-select" 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    <option value="Security">Security & RBAC</option>
                    <option value="Architecture">Frontend Architecture</option>
                    <option value="Performance">State Management & Performance</option>
                    <option value="Tutorials">Developer Tutorials</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Content Preview</label>
                  <textarea 
                    rows={6} 
                    placeholder="Write article summary or draft markdown text here..."
                    className="editor-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="primary-action-btn editor">
                  <Send size={16} />
                  <span>Publish Draft to Pipeline</span>
                </button>
              </form>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="content-card">
              <h2>Editor Performance & Content Reports</h2>
              <p className="subtitle">Metrics on readership, article engagement, and publishing frequency</p>
              
              <div className="analytics-summary">
                <div className="analytics-box">
                  <h4>Top Performing Article</h4>
                  <p className="highlight">Understanding Role-Based Access Control in React</p>
                  <span>1,420 Readers &bull; 98% Rating</span>
                </div>

                <div className="analytics-box">
                  <h4>Average Engagement Time</h4>
                  <p className="highlight">4 mins 32 secs</p>
                  <span>+18% compared to last month</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default EditorDashboard;
