"use client"; // Since you might need client-side interactivity

import React from "react";
import styles from "./styles.module.css"; // Importing the CSS Module

interface HeaderProps {
  logoUrl: string;
  logoAlt: string;
  navItems: {
    label: string;
    link: string;
  }[];
  membershipText: string;
}

const Header: React.FC<HeaderProps> = ({
  logoUrl,
  logoAlt,
  navItems = [],
  membershipText,
}) => {
  const handleButtonClick = () => {
    window.location.href = "#"; 
  };
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img
          src={logoUrl}
          alt={logoAlt}
          className={styles.logo}
          width="300"
          height="100"
        />
      </div>
      <nav className={styles.nav}>
        {navItems.map((item, index) => (
          <a href={item.link} key={index} className={styles.navItem}>
            {item.label}
          </a>
        ))}

        <button className="button-white" onClick={handleButtonClick}>
          {membershipText}
        </button>
      </nav>
    </header>
  );
};

export default Header;
