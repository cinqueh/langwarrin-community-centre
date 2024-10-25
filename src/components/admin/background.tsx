import React, { ReactNode } from 'react';
import styles from './shared.module.css';
import { BackButton } from './back-button';

interface TableWrapperProps {
    children: ReactNode;
    title: string;
}

export const TableWrapper: React.FC<TableWrapperProps> = ({ children, title }) => {
    return (
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
            <h1>{title}</h1>
        </div>
        <div className={styles.tableContent}>
          {children}
        </div>
      </div>
    );
};

interface IndividualWrapperProps {
  children: ReactNode;
  title: string;
}

export const IndividualWrapper: React.FC<IndividualWrapperProps> = ({ children, title }) => {
    return (
      <div className={styles.background}>
        <BackButton/>
        <div className={styles.individualWrapper}>
          <div className={styles.individualHeader}>
              <h1>{title}</h1>
          </div>
          <div className={styles.individualContent}>
            {children}
          </div>
        </div>
      </div>
    );
  };
  