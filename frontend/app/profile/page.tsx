"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import AuthGuard from "@/components/auth/AuthGuard";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const load = async () => {
    const res = await apiClient.get("/auth/me");
    if (res?.user) {
      setUser(res.user);
      setName(res.user.name || "");
      setPhone(res.user.phone || "");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone }),
  });

  alert("Profile updated");
};


  if (!user) return <p>Loading profile...</p>;

  return (
    <AuthGuard>
      <div style={{ padding: 20, maxWidth: 400 }}>
        <h1>Profile</h1>

        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <label>Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <button
          onClick={save}
          style={{
            padding: "10px 20px",
            background: "#4caf50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>

        {/* Survey Links */}
        <div style={{ marginTop: 40 }}>
          {user.role === "PLAYER" && (
            <a href="/profile/survey/player" style={{ color: "blue" }}>
              Fill Player Survey →
            </a>
          )}

          {user.role === "PROVIDER" && (
            <a href="/profile/survey/provider" style={{ color: "blue" }}>
              Fill Provider Survey →
            </a>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
