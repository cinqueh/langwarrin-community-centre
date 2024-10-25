'use client';

import styles from './shared.module.css';
import React from 'react';
import { useRouter } from 'next/navigation';

export const BackButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    const currentPath = window.location.pathname;
    
    // Split the current path into segments
    const segments = currentPath.split('/').filter(Boolean);
    
    // Remove the last segment
    if (segments.length > 1) {
      segments.pop();
    }

    // Join the remaining segments to form the new URL
    const parentPath = `/${segments.join('/')}`;
    
    // Client-side navigation to the parent path
    router.push(parentPath);
  };

  return (
    <button onClick={handleClick} className={styles.backButton}>
        <span className={styles.arrow}>&lt;</span>
        Back
    </button>
  );
};