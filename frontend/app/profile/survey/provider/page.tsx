"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function ProviderSurvey() {
  const router = useRouter();

  const [form, setForm] = useState({
    venueCount: "",
    operatingHours: "",
    staffCount: "",
    pricingStrategy: "",
  });

  const set = (key: any, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    await apiClient.post("/surveys/provider", form);
    alert("Survey submitted");
    router.push("/profile");
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h1>Provider Survey</h1>

      <label>Number of Venues</label>
      <input
        onChange={(e) => set("venueCount", e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <label style={{ marginTop: 15 }}>Operating Hours</label>
      <input
        onChange={(e) => set("operatingHours", e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <label style={{ marginTop: 15 }}>Staff Count</label>
      <input
        onChange={(e) => set("staffCount", e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <label style={{ marginTop: 15 }}>Pricing Strategy</label>
      <input
        onChange={(e) => set("pricingStrategy", e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <button
        onClick={submit}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "#4caf50",
          color: "white",
        }}
      >
        Submit Survey
      </button>
    </div>
  );
}
