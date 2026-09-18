import React, { useState } from "react";
import { getUser, logout } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  ShieldCheck, 
  Settings, 
  FileText, 
  LogOut, 
  UserPlus, 
  Trash2, 
  Edit, 
  Key, 
  Activity, 
  Database, 
  CheckCircle,
  AlertTriangle,
  Server,
  Lock,
  Search
} from "lucide-react";

function AdminDashboard() {
  const user = getUser();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("users");
  const [userList, setUserList] = useState([
    { id: 1, name: "Alexander Vance", username: "admin", role: "Admin", status: "Active", lastLogin: "Just now" },
    { id: 2, name: "Elena Rostova", username: "editor", role: "Editor", status: "Active", lastLogin: "10 mins ago" },
    { id: 3, name: "Marcus Chen", username: "viewer", role: "Viewer", status: "Active", lastLogin: "2 hours ago" },
    { id: 4, name: "Sarah Jenkins", username: "sjenkins", role: "Editor", status: "Inactive", lastLogin: "3 days ago" },
    { id: 5, name: "David Kim", username: "dkim", role: "Viewer", status: "Active", lastLogin: "Yesterday" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteUser = (id, name) => {
    setUserList(userList.filter(u => u.id !== id));
    showToast(`User "${name}" has been revoked.`);
  };

  const handleToggleRole = (id) => {
    setUserList(userList.map(u => {
      if (u.id === id) {
        const nextRole = u.role === "Admin" ? "Editor" : u.role === "Editor" ? "Viewer" : "Admin";
        return { ...u, role: nextRole };
      }
      return u;
    }));
    showToast("User role updated successfully.");
  };

  const filteredUsers = userList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="dashboard-header admin-theme">
        <div className="header-badge">
          <ShieldCheck size={18} />
          <span>Admin Access Level 3 &bull; SAM FAWAZ ALBASARA (24BAI70236)</span>
        </div>
        <h1>System Administration Dashboard</h1>
        <p>Full control over platform access control, user roles, security audit logs, and global configuration.</p>

        <div className="admin-stats-grid">
          <div className="stat-card">
            <div className="stat-icon users-icon"><Users size={20} /></div>
            <div className="stat-data">
              <span className="stat-value">{userList.length}</span>
              <span className="stat-label">Registered Accounts</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon security-icon"><Key size={20} /></div>
            <div className="stat-data">
              <span className="stat-value">RBAC Enforced</span>
              <span className="stat-label">JWT Token Security</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon activity-icon"><Activity size={20} /></div>
            <div className="stat-data">
              <span className="stat-value">100% Secure</span>
              <span className="stat-label">Route Status</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon server-icon"><Server size={20} /></div>
            <div className="stat-data">
              <span className="stat-value">Node Active</span>
              <span className="stat-label">HS256 Secret Verification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar Tabs */}
      <div className="dashboard-grid">
        {/* Navigation / Action Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-section-title">Admin Management</div>
          <button 
            className={`sidebar-nav-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={18} />
            <span>User Management</span>
          </button>
          
          <button 
            className={`sidebar-nav-btn ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            <FileText size={18} />
            <span>Security Audit Reports</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={18} />
            <span>System Settings</span>
          </button>

          <div className="sidebar-divider"></div>

          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout Account</span>
          </button>
        </aside>

        {/* Dynamic Section Content */}
        <main className="dashboard-content">
          {activeTab === "users" && (
            <div className="content-card">
              <div className="card-top-bar">
                <div>
                  <h2>User & Permission Management</h2>
                  <p className="subtitle">Assign roles and manage active authentication tokens</p>
                </div>
                <button className="primary-action-btn" onClick={() => showToast("Add User dialog initialized.")}>
                  <UserPlus size={16} />
                  <span>Create New Account</span>
                </button>
              </div>

              {/* Search filter */}
              <div className="search-bar-wrapper">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Filter users by name, username, or role..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* User Table */}
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>User Info</th>
                      <th>Username</th>
                      <th>Role Privilege</th>
                      <th>Status</th>
                      <th>Last Session</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div className="user-table-cell">
                            <div className="user-avatar-circle">{u.name.charAt(0)}</div>
                            <span className="user-full-name">{u.name}</span>
                          </div>
                        </td>
                        <td><code>{u.username}</code></td>
                        <td>
                          <button 
                            className={`role-badge-btn ${u.role.toLowerCase()}`}
                            onClick={() => handleToggleRole(u.id)}
                            title="Click to cycle role (Admin -> Editor -> Viewer)"
                          >
                            {u.role}
                          </button>
                        </td>
                        <td>
                          <span className={`status-pill ${u.status.toLowerCase()}`}>
                            {u.status}
                          </span>
                        </td>
                        <td>{u.lastLogin}</td>
                        <td>
                          <div className="action-buttons-group">
                            <button 
                              className="icon-btn edit" 
                              onClick={() => showToast(`Editing settings for ${u.username}`)}
                              title="Edit Permissions"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              className="icon-btn delete" 
                              onClick={() => handleDeleteUser(u.id, u.name)}
                              title="Revoke User"
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

          {activeTab === "reports" && (
            <div className="content-card">
              <h2>Security Audit & Access Logs</h2>
              <p className="subtitle">Real-time inspection of route authorizations and token validation events</p>
              
              <div className="logs-list">
                <div className="log-item success">
                  <CheckCircle size={18} className="log-icon" />
                  <div className="log-details">
                    <span className="log-title">Authorization Granted: /admin</span>
                    <span className="log-meta">User: <strong>{user?.username}</strong> (Role: {user?.role}) &bull; IP: 127.0.0.1</span>
                  </div>
                  <span className="log-time">Just now</span>
                </div>

                <div className="log-item warning">
                  <AlertTriangle size={18} className="log-icon" />
                  <div className="log-details">
                    <span className="log-title">Access Denied: Protected Route /admin Blocked</span>
                    <span className="log-meta">Attempted by User: <strong>viewer</strong> (Role: Viewer) &bull; Redirected to /unauthorized</span>
                  </div>
                  <span className="log-time">14 mins ago</span>
                </div>

                <div className="log-item success">
                  <CheckCircle size={18} className="log-icon" />
                  <div className="log-details">
                    <span className="log-title">Token Signed Successfully (HS256)</span>
                    <span className="log-meta">User authenticated: editor &bull; Token generated with valid header & payload</span>
                  </div>
                  <span className="log-time">1 hour ago</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="content-card">
              <h2>RBAC Global Security Settings</h2>
              <p className="subtitle">Configure JWT expiration, permission matrices, and system policies</p>
              
              <div className="settings-form">
                <div className="setting-row">
                  <div>
                    <div className="setting-title">Strict Role Enforcements</div>
                    <div className="setting-desc">Automatically reject users lacking specific role claim payload</div>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle-checkbox" />
                </div>

                <div className="setting-row">
                  <div>
                    <div className="setting-title">JWT Expiry Timeout</div>
                    <div className="setting-desc">Token duration in localStorage before requiring re-authentication</div>
                  </div>
                  <select className="custom-select" defaultValue="3600">
                    <option value="1800">30 Minutes</option>
                    <option value="3600">1 Hour (Default)</option>
                    <option value="86400">24 Hours</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
