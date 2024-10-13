import { ReactNode } from "react";
import styles from './shared.module.css';
import SignOut from "./sign-out";
import NavigationLinks from "./navigation";
import { Anton } from "next/font/google";

type AdminHeaderProps = {
    children: ReactNode;
};

const AdminHeader = ({ children }: AdminHeaderProps) => {
    return (
      <>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <NavigationLinks />
            <SignOut />
          </nav>
        </header>
        {children}
      </>
    );
};

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});

const AdminHeaderSignedOut = ({ children }: AdminHeaderProps) => {
    return (
      <>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <div className={`${styles.adminPortal} ${anton.className}`}>
                Admin Portal
                <span className={styles.centerName}>Langwarrin Community Centre</span>
            </div>
          </nav>
        </header>
        {children}
      </>
    );
};

export { AdminHeaderSignedOut };
export default AdminHeader;

