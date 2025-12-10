"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import AuthGuard from "@/components/auth/AuthGuard";
import VenueCard from "@/components/venues/VenueCard";
import VenueFilterBar from "@/components/venues/VenueFilterBar";

export default function VenuesPage() {
  const [venues, setVenues] = useState([]);
  const [city, setCity] = useState("");
  const [sportType, setSportType] = useState("");

  const fetchVenues = async () => {
    let query = "";

    if (city) query += `city=${city}&`;
    if (sportType) query += `sportType=${sportType}&`;

    const res = await apiClient.get(`/venues?${query}`);
    setVenues(res?.venues || []);
  };

  useEffect(() => {
    fetchVenues();
  }, [city, sportType]);

  return (
    <AuthGuard>
      <div style={{ padding: 20 }}>
        <h1>Venues</h1>
        <VenueFilterBar setCity={setCity} setSportType={setSportType} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}>
          {venues.map((venue: any) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}

          {venues.length === 0 && <p>No venues found</p>}
        </div>
      </div>
    </AuthGuard>
  );
}
