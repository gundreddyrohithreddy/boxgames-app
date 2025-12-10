"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function check() {
      const res = await apiClient.get("/auth/me");

      if (res?.user) {
        setAllowed(true);
      } else {
        router.replace("/login");
      }

      setLoading(false);
    }
    check();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!allowed) return <p>Redirecting...</p>;

  return children;
}
