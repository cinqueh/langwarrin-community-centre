import { redirect } from 'next/navigation';
import SignOut from "@/components/admin/sign-out";
import { auth } from "@/../auth";
import { Session } from "@auth/core/types";
import Link from 'next/link';
import styles from '../../components/admin/dashboard.module.css';  // Import the CSS module
import AdminHeader from "@/components/admin/admin-header";

// Server-side component for Dashboard
export default async function Dashboard() {
  // Perform authentication server-side
  const session: Session | null = await auth();

  // If no session or not authenticated, redirect to login
  if (!session || !session.user) {
    redirect('admin/sign-in'); // Redirect using Next.js App Router's redirect function
  }

  return (
    <AdminHeader>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.welcomeText}>
            <h2 className={styles.header}>Welcome {session?.user?.name ?? 'Leona'}</h2>
            <p className={styles.loggedInText}>You are logged in as {session?.user?.email ?? '[Account]'}</p>
          </div>
          {/* Sign out button */}
          <SignOut />
        </div>

        <div className={styles.grid}>
          {/* Row 1: Membership, Program Enrolments, Room Hire, Childcare Enquiry */}
          <div className={styles.card}>
            <h3>Membership</h3>
            <Link href="/admin/member">
              <button className={styles.button}>View</button>
            </Link>
          </div>

          <div className={styles.card}>
            <h3>Program Enrolments</h3>
            <Link href="/admin/program-enrolments">
              <button className={styles.button}>View</button>
            </Link>
          </div>

          <div className={styles.card}>
            <h3>Room Hire</h3>
            <Link href="/admin/room-hire">
              <button className={styles.button}>View</button>
            </Link>
          </div>

          <div className={styles.card}>
            <h3>Childcare Enquiry</h3>
            <Link href="/admin/childcare">
              <button className={styles.button}>View</button>
            </Link>
          </div>

          {/* Row 2: General Enquiry, Feedback, Complaints */}
          <div className={styles.card}>
            <h3>General Enquiry</h3>
            <Link href="/admin/general-enquiry">
              <button className={styles.button}>View</button>
            </Link>
          </div>

          <div className={styles.card}>
            <h3>Feedback</h3>
            <Link href="/admin/feedback">
              <button className={styles.button}>View</button>
            </Link>
          </div>

          <div className={styles.card}>
            <h3>Complaints</h3>
            <Link href="/admin/complaint">
              <button className={styles.button}>View</button>
            </Link>
          </div>
        </div>
      </div>
    </AdminHeader>
  );
}
