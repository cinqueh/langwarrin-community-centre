import { ReactNode } from "react";
import styles from './shared.module.css';
import SignOut from "./sign-out";
import NavigationLinks from "./navigation";

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

export default AdminHeader;
