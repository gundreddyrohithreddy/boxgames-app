"use client";

import Link from "next/link";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const loadUser = async () => {
    const res = await apiClient.get("/auth/me");
    if (res?.user) setUser(res.user);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = async () => {
    await apiClient.post("/auth/logout");
    router.push("/login");
  };

  return (
    <nav
      style={{
        height: 60,
        background: "#1e1e1e",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <Link href="/venues">
        <h2 style={{ cursor: "pointer" }}>BoxGames</h2>
      </Link>

      <div style={{ display: "flex", gap: 20 }}>
        {user && (
          <>
            <Link href="/profile">Profile</Link>

            <button
              onClick={logout}
              style={{
                background: "transparent",
                border: "1px solid white",
                padding: "5px 12px",
                cursor: "pointer",
                color: "white",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
