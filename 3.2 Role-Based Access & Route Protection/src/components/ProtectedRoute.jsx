import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, getRole } from "../utils/token";

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const role = getRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" state={{ attemptedPath: location.pathname, currentRole: role }} replace />;
  }

  return children;
}

export default ProtectedRoute;
