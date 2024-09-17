import SignOut from "@/components/admin/sign-out";
import { auth } from "@/../auth";

export default async function Dashboard() {

  const session = await auth();
  if (!session) return <div>Not authenticated</div>
 
  return (
    <div>
      <h1>Dashboard Home Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOut/>
    </div>
  );
  }