"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";

export default function ProviderDashboard() {
  const [stats, setStats] = useState<any>(null);

  const loadStats = async () => {
    const res = await apiClient.get("/admin/overview"); // using admin data for now
    setStats(res || {});
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      <h1>Provider Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <div style={{ padding: 20, border: "1px solid #ddd", width: 200 }}>
          <h3>Total Bookings</h3>
          <p>{stats?.totalBookings || 0}</p>
        </div>

        <div style={{ padding: 20, border: "1px solid #ddd", width: 200 }}>
          <h3>Your Venues</h3>
          <p>{stats?.totalVenues || 0}</p>
        </div>
      </div>
    </div>
  );
}
