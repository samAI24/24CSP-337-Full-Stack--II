// Mock user database with pre-configured role assignments
export const users = [
  {
    username: "admin",
    password: "admin123",
    role: "Admin",
    name: "Alexander Vance",
    email: "admin@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    description: "Full administrative permissions: user management, system configs, audit logs."
  },
  {
    username: "editor",
    password: "editor123",
    role: "Editor",
    name: "Elena Rostova",
    email: "editor@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    description: "Content permissions: article creation, publishing, media library, and draft edits."
  },
  {
    username: "viewer",
    password: "viewer123",
    role: "Viewer",
    name: "Marcus Chen",
    email: "viewer@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    description: "Read-only permissions: view published content, analytics, and personal profile."
  },
];

/**
 * Authenticates user credentials and returns a mock JWT string
 * Header.Payload.Signature
 */
export const authenticateUser = (username, password) => {
  const user = users.find(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
  );

  if (!user) return null;

  const header = btoa(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  );

  const payload = btoa(
    JSON.stringify({
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      iat: Math.floor(Date.now() / 1000)
    })
  );

  const signature = btoa("rbac-secret");

  return `${header}.${payload}.${signature}`;
};
