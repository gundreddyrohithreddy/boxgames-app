"use client";

import { useRouter } from "next/navigation";

export default function VenueCard({ venue }: any) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/venues/${venue.id}`)}
      style={{
        width: 280,
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 15,
        cursor: "pointer",
      }}
    >
      <h3>{venue.name}</h3>
      <p style={{ color: "#666" }}>{venue.city || "Unknown City"}</p>
      <p>{venue.courts?.length || 0} courts available</p>
    </div>
  );
}
