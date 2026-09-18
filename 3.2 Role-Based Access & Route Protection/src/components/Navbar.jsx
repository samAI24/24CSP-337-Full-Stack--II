import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUser, getRole, logout, getRoleBadgeConfig } from "../utils/token";
import { Shield, ShieldAlert, UserCheck, LogOut, Key, ChevronRight, Lock, Eye, Edit3, ShieldCheck } from "lucide-react";
import { authenticateUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const currentRole = getRole();
  const badgeConfig = getRoleBadgeConfig(currentRole);

  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSwitchRole = (targetUsername) => {
    let password = "admin123";
    if (targetUsername === "editor") password = "editor123";
    if (targetUsername === "viewer") password = "viewer123";

    const newToken = authenticateUser(targetUsername, password);
    if (newToken) {
      localStorage.setItem("token", newToken);
      setShowRoleSwitcher(false);
      
      if (targetUsername === "admin") navigate("/admin");
      else if (targetUsername === "editor") navigate("/editor");
      else navigate("/viewer");
    }
  };

  if (!user) return null;

  return (
    <header className="navbar-container">
      <div className="navbar-glass">
        {/* Brand logo & status */}
        <div className="navbar-brand">
          <div className="brand-logo-icon">
            <ShieldCheck size={26} className="brand-shield" />
          </div>
          <div className="brand-info">
            <span className="brand-title">GateKeeper RBAC</span>
            <span className="brand-subtitle">Exp 3.2 &bull; SAM FAWAZ ALBASARA (24BAI70236)</span>
          </div>
        </div>

        {/* Navigation Links with route access badges */}
        <nav className="navbar-nav">
          <Link
            to="/admin"
            className={`nav-item ${location.pathname === "/admin" ? "active" : ""} ${currentRole !== "Admin" ? "restricted" : ""}`}
          >
            <Shield size={16} />
            <span>Admin</span>
            {currentRole !== "Admin" ? (
              <span className="lock-indicator" title="Restricted to Admin">
                <Lock size={12} />
              </span>
            ) : null}
          </Link>

          <Link
            to="/editor"
            className={`nav-item ${location.pathname === "/editor" ? "active" : ""} ${currentRole !== "Editor" ? "restricted" : ""}`}
          >
            <Edit3 size={16} />
            <span>Editor</span>
            {currentRole !== "Editor" ? (
              <span className="lock-indicator" title="Restricted to Editor">
                <Lock size={12} />
              </span>
            ) : null}
          </Link>

          <Link
            to="/viewer"
            className={`nav-item ${location.pathname === "/viewer" ? "active" : ""} ${currentRole !== "Viewer" ? "restricted" : ""}`}
          >
            <Eye size={16} />
            <span>Viewer</span>
            {currentRole !== "Viewer" ? (
              <span className="lock-indicator" title="Restricted to Viewer">
                <Lock size={12} />
              </span>
            ) : null}
          </Link>

          {/* Direct link to test unauthorized handling */}
          <Link
            to="/unauthorized"
            className={`nav-item ${location.pathname === "/unauthorized" ? "active" : ""}`}
            style={{ opacity: 0.8 }}
          >
            <ShieldAlert size={16} style={{ color: "#f43f5e" }} />
            <span>403 Page</span>
          </Link>
        </nav>

        {/* User Profile & Role Info */}
        <div className="navbar-user-section">
          <button 
            className="role-switcher-btn"
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            title="Switch User Role for Testing"
          >
            <Key size={14} />
            <span>Switch Role</span>
          </button>

          {/* Quick Role Switcher Dropdown */}
          {showRoleSwitcher && (
            <div className="role-switcher-dropdown">
              <div className="dropdown-header">Quick Role Switcher</div>
              <button 
                className={`switcher-option ${currentRole === "Admin" ? "active" : ""}`}
                onClick={() => handleSwitchRole("admin")}
              >
                <div className="role-dot admin"></div>
                <div>
                  <div className="opt-title">Admin Account</div>
                  <div className="opt-sub">Full System Privileges</div>
                </div>
              </button>

              <button 
                className={`switcher-option ${currentRole === "Editor" ? "active" : ""}`}
                onClick={() => handleSwitchRole("editor")}
              >
                <div className="role-dot editor"></div>
                <div>
                  <div className="opt-title">Editor Account</div>
                  <div className="opt-sub">Content Management Privileges</div>
                </div>
              </button>

              <button 
                className={`switcher-option ${currentRole === "Viewer" ? "active" : ""}`}
                onClick={() => handleSwitchRole("viewer")}
              >
                <div className="role-dot viewer"></div>
                <div>
                  <div className="opt-title">Viewer Account</div>
                  <div className="opt-sub">Read-Only Privileges</div>
                </div>
              </button>
            </div>
          )}

          <div className="user-profile-badge">
            <img 
              src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} 
              alt={user.name} 
              className="user-avatar"
            />
            <div className="user-text-info">
              <span className="user-name">{user.name || user.username}</span>
              <span className={`user-role-tag ${badgeConfig.colorClass}`}>
                {currentRole}
              </span>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
