"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/apiClient";
import { useParams } from "next/navigation";

export default function ProviderVenueDetails() {
  const { venueId }: any = useParams();
  const [venue, setVenue] = useState<any>(null);

  const load = async () => {
    const res = await apiClient.get(`/venues/${venueId}`);
    setVenue(res?.venue || null);
  };

  useEffect(() => {
    load();
  }, [venueId]);

  if (!venue) return <p>Loading...</p>;

  return (
    <div>
      <h1>{venue.name}</h1>
      <p>{venue.city}</p>
      <p>{venue.address}</p>

      <h3 style={{ marginTop: 30 }}>Courts</h3>

      <Link href={`/provider/venues/${venueId}/courts/new`}>
        <button>➕ Add Court</button>
      </Link>

      <ul style={{ marginTop: 20 }}>
        {venue.courts.map((c: any) => (
          <li key={c.id}>
            {c.name} — {c.sportType} — ₹{c.pricePerHour}
            <Link href={`/provider/venues/${venueId}/courts/${c.id}`}> ✏ Edit</Link>
            <Link href={`/provider/courts/${c.id}/slots`}> 🕒 Slots</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
