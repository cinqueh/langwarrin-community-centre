import { ColumnAdapter } from "@/backend/dto/display-object";
import styles from "./individual.module.css";

interface TableComponentProps<T extends object> {
    data: { [key: string]: any };
    columns: ColumnAdapter<T>[];
}

export const DisplayIndividualComponent = <T extends object>({ data, columns }: TableComponentProps<T>) => {
    
    const columnsWithoutId = columns.filter(column => column.accessor != 'id')
    
    return (
        <div className={styles.container}>
          {columnsWithoutId.map((column) => (
            <div key={column.accessor as string} className={styles.row}>
              <div className={styles.label}>{column.Header as string}</div>
              <div className={styles.value}>{data[column.accessor as string]}</div>
            </div>
          ))}
        </div>
      );
}