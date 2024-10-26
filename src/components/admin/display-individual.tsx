"use client";
import { useState } from 'react';
import { ColumnAdapter } from "../../backend/dto/display-object";
import styles from "./individual.module.css";
import { InquiryDTO } from '../../backend/dto/inquiry';
import { useRouter } from 'next/navigation';

interface TableComponentProps<T extends object> {
    data: { [key: string]: any };
    columns: ColumnAdapter<T>[];
}

interface TableComponentInnerProps<T extends object> extends TableComponentProps<T> {
    onSave: (updatedData: { [key: string]: any }) => void;
    saveStatus: "idle" | "success" | "error";
}

const handleSave = async<T extends Object>(path: string, method: string, data: T): Promise<boolean> => {
    try {
        const response = await fetch(path, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to save notes');
        }

        return true; // Return true for success
    } catch (error) {
        console.error('Error saving notes:', error);
        return false; // Return false for failure
    }
};

export const DisplayIndividualInquiryComponent = <T extends object>({ data, columns }: TableComponentProps<T>) => {
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const router = useRouter();

    const saveNotes = async (editableData: { [key: string]: any }) => {
        setSaveStatus('idle');
        try {

            const data = new InquiryDTO({
                inquiryId: editableData.id as number,
                notes: editableData.notes as string
            })

            const result = await handleSave('/api/admin/notes', 'PUT', data);
            if (result) {
                setSaveStatus('success');
                router.refresh();
            } else {
                setSaveStatus('error');
            }
        } catch (error) {
            setSaveStatus('error');
        }
    };

    return (
        <DisplayIndividualComponent data={data} columns={columns} onSave={saveNotes} saveStatus={saveStatus} />
    );
};

export const DisplayIndividualComponent = <T extends object>({ data, columns, onSave, saveStatus }: TableComponentInnerProps<T>) => {
    // Local state for editable fields
    const [editableData, setEditableData] = useState(data);

    // Handle input change for editable fields
    const handleInputChange = (accessor: string, value: string) => {
        setEditableData((prevData) => ({
            ...prevData,
            [accessor]: value,
        }));
    };

    const hasEditableField = columns.some(column => column.editable);

    const columnsWithoutId = columns.filter(column => column.accessor !== 'id');

    return (
        <div>
        <div className={styles.container}>
          {columnsWithoutId.map((column) => (
            <div key={column.accessor as string} className={styles.row}>
              <div className={styles.label}>{column.Header as string}</div>
              <div className={styles.value}>
                {column.editable ? (
                  // Render input if the column is editable
                  <textarea
                    value={editableData[column.accessor as string]}
                    onChange={(e) => handleInputChange(column.accessor as string, e.target.value)}
                    className={styles.textarea}
                    rows={6}
                    />
                ) : (
                  // Render text if the column is not editable
                  data[column.accessor as string]
                )}
              </div>
            </div>
          ))}
        </div>
          <div>
            <div className={styles.responseContainer}>
                {saveStatus === 'success' && <div className={styles.success}>Save was successful!</div>}
                {saveStatus === 'error' && <div className={styles.failure}>Save failed. Please try again.</div>}
            </div>
            {hasEditableField && (
                <button onClick={() => onSave(editableData)} className={styles.save}>Update</button>
            )}
          </div>
        </div>
    );
};