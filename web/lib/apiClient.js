const API_BASE = "http://localhost:4000";

export async function apiClient(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",   // 🔥 IMPORTANT
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
