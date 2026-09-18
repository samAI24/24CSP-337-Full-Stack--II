/**
 * Token utilities (token.js)
 * Decode JWT Token to extract user information and raw token components.
 */

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(
      atob(parts[1])
    );

    return payload;
  } catch (error) {
    console.error("Failed to decode token payload:", error);
    return null;
  }
};

export const getFullTokenDetails = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    return {
      rawToken: token,
      rawHeader: parts[0],
      rawPayload: parts[1],
      rawSignature: parts[2],
      header: JSON.parse(atob(parts[0])),
      payload: JSON.parse(atob(parts[1])),
      signature: atob(parts[2]),
    };
  } catch (error) {
    console.error("Failed to decode JWT parts:", error);
    return null;
  }
};
