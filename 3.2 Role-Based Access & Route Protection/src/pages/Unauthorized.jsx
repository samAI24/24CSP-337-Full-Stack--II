import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getRole, getUser } from "../utils/token";
import { ShieldAlert, ArrowLeft, Lock, Key, ShieldCheck, Home } from "lucide-react";

function Unauthorized() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRole = getRole();
  const user = getUser();

  const attemptedPath = location.state?.attemptedPath || location.pathname;

  const handleReturnToDashboard = () => {
    if (!currentRole) {
      navigate("/");
    } else if (currentRole === "Admin") {
      navigate("/admin");
    } else if (currentRole === "Editor") {
      navigate("/editor");
    } else {
      navigate("/viewer");
    }
  };

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-glass-card">
        <div className="unauthorized-badge">
          <ShieldAlert size={20} />
          <span>HTTP 403 Forbidden</span>
        </div>

        <div className="unauthorized-icon-wrapper">
          <Lock size={48} className="lock-icon" />
        </div>

        <h1>Access Denied</h1>
        <p className="unauthorized-subtitle">
          You do not have the required role permissions to access <code>{attemptedPath}</code>.
        </p>

        {/* Role Comparison Card */}
        <div className="role-comparison-box">
          <div className="comp-item">
            <span className="comp-label">Your Current Role</span>
            <span className={`role-pill ${currentRole ? currentRole.toLowerCase() : "none"}`}>
              {currentRole || "Unauthenticated"}
            </span>
          </div>

          <div className="comp-divider">
            <Key size={16} />
          </div>

          <div className="comp-item">
            <span className="comp-label">Required Role</span>
            <span className="required-role-pill">
              {attemptedPath.includes("admin") ? "Admin" : attemptedPath.includes("editor") ? "Editor" : "Authorized Role"}
            </span>
          </div>
        </div>

        <p className="rbac-explanation">
          Role-Based Access Control (RBAC) enforces strict route protection based on the claims encoded within your signed JWT authentication token.
        </p>

        <div className="unauthorized-actions">
          <button onClick={handleReturnToDashboard} className="primary-action-btn">
            <Home size={16} />
            <span>Return to Authorized Dashboard</span>
          </button>

          <Link to="/" className="secondary-action-btn">
            <ArrowLeft size={16} />
            <span>Switch Account / Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
