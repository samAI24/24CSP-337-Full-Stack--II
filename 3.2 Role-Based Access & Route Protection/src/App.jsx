import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EditorDashboard from "./pages/EditorDashboard";
import ViewerDashboard from "./pages/ViewerDashboard";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// Wrapper to conditionally render Navbar on non-login pages
function AppLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/unauthorized";

  return (
    <div className="app-main-wrapper">
      {!hideNavbar && <Navbar />}
      <div className="app-content-body">
        <Routes>
          {/* Public Login Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Editor Route */}
          <Route
            path="/editor"
            element={
              <ProtectedRoute allowedRoles={["Editor"]}>
                <EditorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Viewer Route */}
          <Route
            path="/viewer"
            element={
              <ProtectedRoute allowedRoles={["Viewer"]}>
                <ViewerDashboard />
              </ProtectedRoute>
            }
          />

          {/* 403 Unauthorized Access Denied Route */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
