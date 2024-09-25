import { ReactNode } from "react";
import { Anton } from 'next/font/google';
import styles from './shared.module.css';
import SignOut from "./sign-out";

type AdminHeaderProps = {
    children: ReactNode;
};

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
});

const AdminHeader: React.FC<AdminHeaderProps> = ({
    children
}) => {
    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <a href="#" className={`${styles.navItem} ${styles.active}`}>
                        Members
                    </a>
                    <a href="#" className={styles.navItem}>
                        Program Enrolments
                    </a>
                    <div className={`${styles.adminPortal} ${anton.className}`}>
                        Admin Portal
                        <span className={styles.centerName}>Langwarrin Community Centre</span>
                    </div>
                    <a href="#" className={styles.navItem}>
                        Room Bookings
                    </a>
                    <SignOut/>
                </nav>
            </header>
            {children}
        </>
    );
};

export default AdminHeader;