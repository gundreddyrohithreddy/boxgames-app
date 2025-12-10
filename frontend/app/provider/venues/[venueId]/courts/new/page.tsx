"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useRouter, useParams } from "next/navigation";

export default function AddCourt() {
  const router = useRouter();
  const { venueId }: any = useParams();

  const [name, setName] = useState("");
  const [sportType, setSportType] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    await apiClient.post(`/courts/venue/${venueId}`, {
      name,
      sportType,
      pricePerHour: Number(pricePerHour),
    });

    router.push(`/provider/venues/${venueId}`);
  };

  return (
    <div>
      <h1>Add Court</h1>

      <form style={{ display: "flex", flexDirection: "column", width: 300 }} onSubmit={submit}>
        <input placeholder="Court Name" onChange={(e) => setName(e.target.value)} />
        
        <select onChange={(e) => setSportType(e.target.value)} style={{ padding: 10 }}>
          <option value="">Sport Type</option>
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
          <option value="badminton">Badminton</option>
          <option value="tennis">Tennis</option>
        </select>

        <input
          placeholder="Price per hour"
          type="number"
          onChange={(e) => setPricePerHour(e.target.value)}
        />

        <button type="submit" style={{ marginTop: 20 }}>Save</button>
      </form>
    </div>
  );
}
