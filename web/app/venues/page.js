"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/apiClient";

export default function VenuesPage() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await apiRequest("/venues");
        setVenues(data);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  return (
    <main style={{ maxWidth: 800, margin: "40px auto" }}>
      <h1>Available Venues</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {venues.map(v => (
          <li key={v.id} style={{ border: "1px solid #ccc", margin: "10px 0", padding: 10 }}>
            <h3>{v.name}</h3>
            <p>{v.city} - {v.address}</p>
            <p>Sports: {v.sports}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
