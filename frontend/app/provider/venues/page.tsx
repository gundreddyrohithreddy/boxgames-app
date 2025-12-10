"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/apiClient";

export default function ProviderVenues() {
  const [venues, setVenues] = useState([]);

  const load = async () => {
    const res = await apiClient.get("/venues");
    // filter the venues that belong to the provider
    const filtered = res?.venues?.filter((v: any) => v.providerId);
    setVenues(filtered || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>My Venues</h1>

      <Link href="/provider/venues/new">
        <button style={{ marginTop: 20 }}>➕ Add Venue</button>
      </Link>

      <div style={{ marginTop: 30 }}>
        {venues.map((v: any) => (
          <div
            key={v.id}
            style={{ padding: 15, borderBottom: "1px solid #ddd", cursor: "pointer" }}
          >
            <Link href={`/provider/venues/${v.id}`}>{v.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
