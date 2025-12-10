"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { apiClient } from "@/lib/apiClient";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const res = await apiClient.get("/bookings/me");
    setBookings(res?.bookings || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <AuthGuard>
      <div style={{ padding: 20 }}>
        <h1>My Bookings</h1>

        {bookings.map((b: any) => (
          <div key={b.id} style={{ border: "1px solid #ddd", padding: 15, marginBottom: 15 }}>
            <h3>{b.slot.court.venue.name}</h3>
            <p>Court: {b.slot.court.name}</p>
            <p>Sport: {b.slot.court.sportType}</p>
            <p>
              Time:{" "}
              {new Date(b.slot.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>Status: {b.status}</p>
            <p>Payment: {b.paymentStatus}</p>
          </div>
        ))}
      </div>
    </AuthGuard>
  );
}
