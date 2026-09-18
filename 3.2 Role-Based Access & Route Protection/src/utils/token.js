/**
 * Token utility functions for handling JWT in localStorage
 */

export const getUser = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;
    return JSON.parse(atob(payloadPart));
  } catch (e) {
    console.error("Failed to parse JWT token:", e);
    return null;
  }
};

export const getRole = () => {
  const user = getUser();
  return user?.role;
};

export const isAuthenticated = () => {
  const user = getUser();
  return !!user;
};

export const logout = () => {
  localStorage.removeItem("token");
};

/**
 * Returns role badge styles and icon metadata
 */
export const getRoleBadgeConfig = (role) => {
  switch (role) {
    case "Admin":
      return {
        colorClass: "role-badge-admin",
        label: "Admin System Access",
        bgGlow: "rgba(244, 63, 94, 0.15)",
        borderColor: "rgba(244, 63, 94, 0.4)",
        textColor: "#fb7185"
      };
    case "Editor":
      return {
        colorClass: "role-badge-editor",
        label: "Editor Content Rights",
        bgGlow: "rgba(168, 85, 247, 0.15)",
        borderColor: "rgba(168, 85, 247, 0.4)",
        textColor: "#c084fc"
      };
    case "Viewer":
      return {
        colorClass: "role-badge-viewer",
        label: "Viewer Read-Only Access",
        bgGlow: "rgba(16, 185, 129, 0.15)",
        borderColor: "rgba(16, 185, 129, 0.4)",
        textColor: "#34d399"
      };
    default:
      return {
        colorClass: "",
        label: "Unknown Role",
        bgGlow: "rgba(148, 163, 184, 0.15)",
        borderColor: "rgba(148, 163, 184, 0.4)",
        textColor: "#cbd5e1"
      };
  }
};
