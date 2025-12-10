import AuthGuard from "@/components/auth/AuthGuard";

export default function VenuesPage() {
  return (
    <AuthGuard>
      <div>Your venues content will go here.</div>
    </AuthGuard>
  );
}
