"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    const res = await apiClient.post("/auth/login", { email, password });

    if (res?.user) {
      if (res.user.role === "PLAYER") {
        router.push("/venues");
      } else if (res.user.role === "PROVIDER") {
        router.push("/provider/dashboard");
      }
    } else {
      setError(res?.message || "Invalid login");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: 300 }}>
        <input placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" required onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

useEffect(() => {
  async function alreadyLoggedIn() {
    const res = await apiClient.get("/auth/me");
    if (res.user) {
      if (res.user.role === "PLAYER") router.push("/venues");
      else router.push("/provider/dashboard");
    }
  }
  alreadyLoggedIn();
}, []);
