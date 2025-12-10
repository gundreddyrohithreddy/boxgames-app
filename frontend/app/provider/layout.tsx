"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import Link from "next/link";

export default function ProviderLayout({ children }: any) {
  return (
    <AuthGuard>
      <div style={{ display: "flex" }}>
        
        {/* Sidebar */}
        <div
          style={{
            width: 240,
            minHeight: "100vh",
            background: "#f1f1f1",
            padding: 20,
            borderRight: "1px solid #ddd",
          }}
        >
          <h2>Provider</h2>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 30, lineHeight: "2rem" }}>
            <li><Link href="/provider/dashboard">📊 Dashboard</Link></li>
            <li><Link href="/provider/venues">🏟️ My Venues</Link></li>
            <li><Link href="/provider/bookings">📘 Bookings</Link></li>
          </ul>
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, padding: 30 }}>{children}</div>
      </div>
    </AuthGuard>
  );
}
