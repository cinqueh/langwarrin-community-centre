// components/admin/DeleteButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './individual.module.css';

interface DeleteButtonProps {
  id: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this member?');
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/member/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Member deleted successfully.');
        router.push('/admin/member'); // Redirect to member list page
      } else {
        const data = await response.json();
        alert(`Error deleting member: ${data.error || response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <button onClick={handleDelete} className={styles.save}>
      Delete Member
    </button>
  );
};

export default DeleteButton;
