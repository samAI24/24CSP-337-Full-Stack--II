/**
 * Authentication Service (authService.js)
 * Implements JWT token generation upon valid user credentials for student Sam Fawaz.
 */
export const authenticateUser = (username, password) => {
  const validUser = {
    username: "SamFawaz",
    password: "24BAI70236",
    email: "samfawaz.24bai70236@cumail.in",
    role: "Administrator",
  };

  // Support both Sam Fawaz and teacher fallback
  const isSam = (username.toLowerCase() === "samfawaz" || username.toLowerCase() === "sam") && password === "24BAI70236";
  const isTeacher = username === "Lovleen" && password === "E20454";

  if (isSam || isTeacher) {
    const activeUser = isSam ? validUser : {
      username: "Lovleen",
      email: "Lovleen.e20454@cumail.in",
      role: "Administrator",
    };

    const header = btoa(
      JSON.stringify({
        alg: "HS256",
        typ: "JWT",
      })
    );

    const payload = btoa(
      JSON.stringify({
        username: activeUser.username,
        email: activeUser.email,
        role: activeUser.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
      })
    );

    const signature = btoa("jwt-signature");

    return `${header}.${payload}.${signature}`;
  }

  return null;
};
