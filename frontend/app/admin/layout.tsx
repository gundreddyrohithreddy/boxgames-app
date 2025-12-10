"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import Link from "next/link";

export default function AdminLayout({ children }: any) {
  return (
    <AuthGuard>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: 220,
            minHeight: "100vh",
            background: "#222",
            color: "white",
            padding: 20,
          }}
        >
          <h2>Admin</h2>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
            <li><Link href="/admin/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        <div style={{ flex: 1, padding: 30 }}>{children}</div>
      </div>
    </AuthGuard>
  );
}
