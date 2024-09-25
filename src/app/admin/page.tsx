
import { redirect } from 'next/navigation';
import SignOut from "@/components/admin/sign-out";
import { auth } from "@/../auth";
import { Session } from "@auth/core/types";

// Server-side component for Dashboard
export default async function Dashboard() {
  // Perform authentication server-side
  const session: Session | null = await auth();

  // If no session or not authenticated, redirect to login
  if (!session || !session.user) {
    redirect('admin/sign-in'); // Redirect using Next.js App Router's redirect function
  }

  redirect('admin/member');

  return (
    <div>
      <h1>Dashboard Home Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOut />
    </div>
  );
}