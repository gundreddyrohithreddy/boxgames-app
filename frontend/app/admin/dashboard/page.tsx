"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  const load = async () => {
    const res = await apiClient.get("/admin/overview");
    setStats(res);
  };

  useEffect(() => {
    load();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <div style={{ padding: 20, border: "1px solid #ddd", width: 200 }}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div style={{ padding: 20, border: "1px solid #ddd", width: 200 }}>
          <h3>Total Venues</h3>
          <p>{stats.totalVenues}</p>
        </div>
        <div style={{ padding: 20, border: "1px solid #ddd", width: 200 }}>
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
        <div style={{ padding: 20, border: "1px solid #ddd", width: 200 }}>
          <h3>Total Revenue</h3>
          <p>₹{stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
}
