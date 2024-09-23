'use client'; // This must be a client component to handle interaction

import { useTable, Column, Row } from 'react-table';
import { useRouter } from 'next/navigation'; // Use next/navigation for client-side routing
import styles from "./styles.module.css";
import { useState } from 'react';
import { saveAs } from 'file-saver';


interface TableComponentProps<T extends object> {
    data: T[];
    descriptor: string,
    linkedUrl: string,
    columns: Column<T>[];
}

const TableComponent = <T extends object>({ data, columns, descriptor, linkedUrl }: TableComponentProps<T>) => {
    const [visibleColumns, setVisibleColumns] = useState(columns);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
  
    const handleFilterClick = () => {
      const filteredColumns = columns.filter(column =>
        ["Name", "Email", "Phone"].includes(column.Header as string)
      ); // Show only 'Name', 'Email', and 'Phone' fields for example
      setVisibleColumns(filteredColumns);
    };
  
    return (
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>
            <i className={styles.iconGroup}></i> {data.length} {descriptor}
          </div>
          <div className={styles.tableActions}>
            {/* <button className={styles.filterButton} onClick={handleFilterClick}>
              <i className={styles.iconFilter}></i> Filter
            </button> */}
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className={styles.searchInput} 
            />
            <button className={styles.downloadButton} onClick={() => downloadCSV(data, visibleColumns)}>
              Download <i className={styles.iconDownload}></i>
            </button>
          </div>
        </div>
        <TableComponentInner data={data} columns={visibleColumns} searchQuery={searchQuery} linkedUrl={linkedUrl} />
      </div>
    );
}

const downloadCSV = <T extends object>(data: T[], columns: Column<T>[]) => {
  const csvRows: string[] = [];

  // Add header row
  const headers = columns.map(column => column.Header).join(',');
  csvRows.push(headers);

  // Add data rows
  data.forEach(row => {
      const values = columns.map(column => {
          const cellValue = (row as any)[column.accessor as keyof T]; // Access the correct field using column id
          return typeof cellValue === 'undefined' || cellValue === null
              ? ''
              : `"${cellValue}"`; // Wrap values in quotes for CSV formatting
      });
      csvRows.push(values.join(','));
  });

  // Convert to CSV format
  const csvString = csvRows.join('\n');

  // Trigger download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `table_export.csv`);
};
  
interface TableComponentInnerProps<T extends object> {
    data: T[];
    columns: Column<T>[];
    linkedUrl: string;
    searchQuery: string;
}
  
const TableComponentInner = <T extends object>({ data, columns, searchQuery, linkedUrl }: TableComponentInnerProps<T>) => {
    const router = useRouter();
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({ columns, data });
  
    // Filter the rows based on the search query
    const filteredRows = rows.filter((row) => {

        if (!searchQuery) {
            return true;
        }

        return row.cells.some((cell) => {
          const cellValue = cell.value; // Get the cell value
          return cellValue && cellValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    });

    const handleRowClick = (row: Row<T>) => {
        const id = (row.original as any).id;
        if (id) {
          router.push(`${linkedUrl}/${id}`);
        }
    };
  
    const highlightText = (text: string, query: string) => {
      if (!query) return text;
      const parts = text.split(new RegExp(`(${query})`, 'gi'));
      return (
        <>
          {parts.map((part, index) => 
            part.toLowerCase() === query.toLowerCase() ? (
              <span key={index} className={styles.highlight}>{part}</span>
            ) : (
              part
            )
          )}
        </>
      );
    };
  
    return (
      <table {...getTableProps()} className={styles.styledTable}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={headerGroupKey} {...headerGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key: columnKey, ...columnProps } = column.getHeaderProps();
                  return (
                    <th key={columnKey} {...columnProps}>
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
            {filteredRows.map((row) => {
                prepareRow(row);
                const { key: rowKey, ...rowProps } = row.getRowProps();
                return (
                    <tr key={rowKey} {...rowProps} onClick={() => handleRowClick(row)}>
                    {row.cells.map((cell) => {
                        const { key: cellKey, ...cellProps } = cell.getCellProps();
                        const cellContent = cell.render('Cell');
                        const cellValue = cell.value ? cell.value.toString() : ''; // Fallback to empty string if null/undefined
                        return (
                        <td key={cellKey} {...cellProps}>
                            {highlightText(cellValue, searchQuery)}
                        </td>
                        );
                    })}
                    </tr>
                );
            })}
        </tbody>
      </table>
    );
  };

export default TableComponent;
