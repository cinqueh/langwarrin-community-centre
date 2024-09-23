import React, { ReactNode } from 'react';
import styles from './background.module.css';

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
  