"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useRouter, useParams } from "next/navigation";

export default function SlotCreationPage() {
  const { courtId }: any = useParams();
  const router = useRouter();

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("22:00");

  const submit = async (e: any) => {
    e.preventDefault();

    const res = await apiClient.post(`/slots/court/${courtId}/bulk`, {
      date,
      startTime,
      endTime,
    });

    alert(`${res.count} slots created`);
    router.back();
  };

  return (
    <div>
      <h1>Create Slots (Bulk)</h1>

      <form style={{ display: "flex", flexDirection: "column", width: 300 }} onSubmit={submit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Start Time</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

        <label>End Time</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

        <button type="submit" style={{ marginTop: 20 }}>Generate Slots</button>
      </form>
    </div>
  );
}
