"use client"; // Since you might need client-side interactivity

// import Image from 'next/image';
import React from "react";
import styles from "./styles.module.css"; // Importing the CSS Module

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.contactSection}>
          <h3 className={styles.contactTitle}>Contact Us</h3>
          <p className={styles.text}>📞 (03) 9789 7653</p>
          <p className={styles.text}>✉️ reception@langwarrincc.org.au</p>
          <button className={styles.button}>Enquire Online</button>
        </div>
        
        <div className={styles.logoSection}>
          <h1 className={styles.logoText}>LANGWARRIN</h1>
          <h2 className={styles.subText}>Community Centre</h2>
          <button className={styles.button}>Become a Member</button>
        </div>

        <div className={styles.addressSection}>
          <h3 className={styles.addressTitle}>Address</h3>
          <p className={styles.text}>2 Lang Rd, Langwarrin VIC 3910</p>
          <p className={styles.text}>Monday to Friday</p>
          <p className={styles.text}>9:00AM - 4:30PM</p>
        </div>
      </div>
      
      <div className={styles.copyright}>
        <p>Copyright © 2014 All Rights Reserved. Langwarrin Community Centre</p>
      </div>
    </footer>
  );
};

export default Footer;