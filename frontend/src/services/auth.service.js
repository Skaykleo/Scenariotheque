const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const getMe = async () => {
  const res = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
};

const logout = async () => {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

const loginWithGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
};

export { getMe, logout, loginWithGoogle };
