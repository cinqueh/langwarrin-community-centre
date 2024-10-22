'use client'; // This is a client component

import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation
import styles from './shared.module.css';
import { Anton } from 'next/font/google';

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});


const NavigationLinks: React.FC = () => {
  const pathname = usePathname(); // Get the current path

  // Helper function to check if the current path matches the link's path
  const isActive = (path: string) => pathname === path;

  // Handle navigation programmatically
  const handleNavigation = (path: string) => {
    window.location.href = path; // Alternatively, you can use router.push here as before
  };

  return (
    <>
        <div onClick={() => handleNavigation('/admin')} className={`${styles.adminPortal} ${anton.className}`}>
              Admin Portal
              <span className={styles.centerName}>Langwarrin Community Centre</span>
        </div>
      <div onClick={() => handleNavigation('/admin/member')} className={`${styles.navItem} ${isActive('/admin/member') ? styles.active : ''}`}>
        Membership
      </div>
      <div onClick={() => handleNavigation('/admin/program-enrolments')} className={`${styles.navItem} ${isActive('/admin/program-enrolments') ? styles.active : ''}`}>
        Program Enrolments
      </div>
      <div onClick={() => handleNavigation('/admin/room-hire')} className={`${styles.navItem} ${isActive('/admin/room-hire') ? styles.active : ''}`}>
        Room Hire
      </div>
      <div onClick={() => handleNavigation('/admin/childcare')} className={`${styles.navItem} ${isActive('/admin/childcare') ? styles.active : ''}`}>
        Childcare Enquiry
      </div>
      <div onClick={() => handleNavigation('/admin/general-enquiry')} className={`${styles.navItem} ${isActive('/admin/general-inquiry') ? styles.active : ''}`}>
        General Enquiry
      </div>
      <div onClick={() => handleNavigation('/admin/feedback')} className={`${styles.navItem} ${isActive('/admin/feedback') ? styles.active : ''}`}>
        Feedback
      </div>
      <div onClick={() => handleNavigation('/admin/complaint')} className={`${styles.navItem} ${isActive('/admin/complaint') ? styles.active : ''}`}>
        Complaints
      </div>
    </>
  );
};

export default NavigationLinks;
