"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function PlayerSurvey() {
  const router = useRouter();

  const [form, setForm] = useState({
    preferredSports: "",
    skillLevel: "",
    usualPlayTime: "",
    needTeam: "",
  });

  const set = (key: any, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    await apiClient.post("/surveys/player", form);
    alert("Survey submitted");
    router.push("/profile");
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h1>Player Survey</h1>

      <label>Preferred Sports</label>
      <input
        onChange={(e) => set("preferredSports", e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <label style={{ marginTop: 15 }}>Skill Level</label>
      <select onChange={(e) => set("skillLevel", e.target.value)} style={{ width: "100%" }}>
        <option value="">Select</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <label style={{ marginTop: 15 }}>Usual Play Time</label>
      <input
        onChange={(e) => set("usualPlayTime", e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <label style={{ marginTop: 15 }}>Need Team?</label>
      <select onChange={(e) => set("needTeam", e.target.value)} style={{ width: "100%" }}>
        <option value="">Select</option>
        <option>Yes</option>
        <option>No</option>
      </select>

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
