"use client"; // Since you might need client-side interactivity

import Image from 'next/image';
import React from "react";
import styles from "./styles.module.css"; // Importing the CSS Module

const logo = "/images/templogo.png";

const Header: React.FC = () => {
    return (
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="Langwarrin Community Centre" className={styles.logo}
          width={300} height={100} />
        </div>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>Programs</a>
          <a href="#" className={styles.navItem}>Children</a>
          <a href="#" className={styles.navItem}>Room Hire</a>
          <a href="#" className={styles.navItem}>Forms</a>
          <a href="#" className={styles.navItem}>About</a>
          <a href="#" className={`${styles.navItem} ${styles.membershipButton}`}>Membership</a>
        </nav>
      </header>
    );
  };

export default Header;