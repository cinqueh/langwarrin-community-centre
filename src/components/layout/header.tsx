"use client"; // Since you might need client-side interactivity

import React, { useState } from "react";
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
  const [isNavOpen, setIsNavOpen] = useState(false); 

  const handleButtonClick = () => {
    window.location.href = "/membership";
  };
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  // Toggling the nav state
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer} onClick={handleLogoClick}>
        <img
          src={logoUrl}
          alt={logoAlt}
          className={styles.logo}
          width="300"
          height="100"
        />
      </div>

      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={toggleNav}>
        <div className={styles.hamburgerIcon}></div>
        <div className={styles.hamburgerIcon}></div>
        <div className={styles.hamburgerIcon}></div>
      </div>

      <nav className={`${styles.nav} ${isNavOpen ? styles.active : ""}`}>
        {navItems.map((item, index) => (
          <a
            href={item.link}
            key={index}
            className={`${styles.navItem} ${
              window.location.pathname === item.link ? styles.activeNavItem : ""
            }`}
          >
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