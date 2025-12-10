"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function NewVenue() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    await apiClient.post("/venues", {
      name,
      city,
      address,
      description,
    });

    router.push("/provider/venues");
  };

  return (
    <div>
      <h1>Add New Venue</h1>

      <form
        onSubmit={submit}
        style={{ display: "flex", flexDirection: "column", width: 300, marginTop: 20 }}
      >
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="City" onChange={(e) => setCity(e.target.value)} />
        <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" style={{ marginTop: 20 }}>
          Save
        </button>
      </form>
    </div>
  );
}
