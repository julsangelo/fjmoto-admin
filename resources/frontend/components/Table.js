import React, { useState } from "react";
import styles from "./Table.module";
import TableButton from "./TableButton";
import Icon from "./Icon";

export default function InventoryTable({ checkbox, data, action }) {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const isDataValid = data && Array.isArray(data.data);

    const totalPages = isDataValid
        ? Math.ceil(data.data.length / itemsPerPage)
        : 0;

    const currentItems = isDataValid
        ? data.data.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage,
          )
        : [];

    const formatHeader = (item) => {
        return item
            .replace(/([A-Z])/g, " $1")
            .replace(/_/g, " ")
            .trim()
            .split(" ")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(" ");
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {checkbox && (
                            <th>
                                <input type="checkbox" />
                            </th>
                        )}
                        {isDataValid &&
                            data.headers?.map((item, index) => (
                                <th key={index}>{formatHeader(item)}</th>
                            ))}
                        {action && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    {checkbox && (
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                    )}
                                    {isDataValid &&
                                        data.headers.map((header, index) => (
                                            <td
                                                key={index}
                                                style={
                                                    index === 0
                                                        ? {
                                                              padding:
                                                                  "10px 20px 10px 20px",
                                                          }
                                                        : {}
                                                }
                                            >
                                                {header.toLowerCase() ===
                                                "image" ? (
                                                    <img
                                                        className={
                                                            styles.productImage
                                                        }
                                                        src={item.image}
                                                        alt={
                                                            item.product ||
                                                            "Product Image"
                                                        }
                                                    />
                                                ) : header.toLowerCase() ===
                                                  "price" ? (
                                                    `₱ ${item[header]}`
                                                ) : (
                                                    item[header]
                                                )}
                                            </td>
                                        ))}
                                    {action && (
                                        <td>
                                            <div className={styles.tableAction}>
                                                <TableButton
                                                    icon="delete"
                                                    size="24"
                                                />
                                                <TableButton
                                                    icon="edit"
                                                    size="24"
                                                />
                                            </div>
                                        </td>
                                    )}
                                </tr>
                                <tr>
                                    <td
                                        colSpan={
                                            (isDataValid
                                                ? data.headers.length
                                                : 0) +
                                            (checkbox ? 1 : 0) +
                                            (action ? 1 : 0)
                                        }
                                    >
                                        <hr />
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={
                                    (isDataValid ? data.headers.length : 0) +
                                    (checkbox ? 1 : 0) +
                                    (action ? 1 : 0)
                                }
                            >
                                <div className={styles.noData}>
                                    No entries available.
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isDataValid && currentItems.length > 0 && (
                <div className={styles.tableBottom}>
                    <div className={styles.page}>
                        Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                        {Math.min(
                            currentPage * itemsPerPage,
                            isDataValid ? data.data.length : 0,
                        )}{" "}
                        of {isDataValid ? data.data.length : 0} entries
                    </div>
                    <div className={styles.pagination}>
                        <button
                            className={styles.paginationButton}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <Icon icon="chevLeft" size="20" />
                        </button>
                        <div className={styles.paginationPage}>
                            {currentPage}
                        </div>
                        <button
                            className={styles.paginationButton}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <Icon icon="chevRight" size="20" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
