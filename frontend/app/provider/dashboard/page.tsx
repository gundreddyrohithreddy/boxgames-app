import AuthGuard from "@/components/auth/AuthGuard";

export default function ProviderDashboard() {
  return (
    <AuthGuard>
      <div>Provider Dashboard</div>
    </AuthGuard>
  );
}
