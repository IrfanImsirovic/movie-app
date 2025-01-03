// app/profile/page.tsx
"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function ProfilePage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user)
    return (
      <p>
        You need to <a href="/api/auth/login">login</a> to view your profile.
      </p>
    );

  // If user is logged in, display their details
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
