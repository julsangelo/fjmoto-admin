import React from "react";
import styles from "./Table.module";
import TableButton from "./TableButton";
import Icon from "./Icon";

export default function InventoryTable({ checkbox, data }) {
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
                        {data.headers?.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.data?.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                {checkbox && (
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                )}
                                {data.headers.map((header, index) => (
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
                                        {header === "Image" ? (
                                            <img
                                                className={styles.productImage}
                                                src={item.image}
                                                alt={
                                                    item.product ||
                                                    "Product Image"
                                                }
                                            />
                                        ) : (
                                            item[
                                                header
                                                    .toLowerCase()
                                                    .replace(" ", "")
                                            ] || (
                                                <div
                                                    className={
                                                        styles.tableAction
                                                    }
                                                >
                                                    <TableButton
                                                        icon="delete"
                                                        height="24"
                                                        width="24"
                                                    />
                                                    <TableButton
                                                        icon="edit"
                                                        height="24"
                                                        width="24"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td
                                    colSpan={
                                        data.headers.length + (checkbox ? 1 : 0)
                                    }
                                >
                                    <hr />
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div className={styles.tableBottom}>
                <div className={styles.page}>Showing 1 - 7 of 7 entries </div>
                <div className={styles.pagination}>
                    <button className={styles.paginationButton}>
                        {" "}
                        <Icon icon="chevLeft" height="20" width="20" />{" "}
                    </button>
                    <div className={styles.paginationPage}>1</div>
                    <button className={styles.paginationButton}>
                        {" "}
                        <Icon icon="chevRight" height="20" width="20" />{" "}
                    </button>
                </div>
            </div>
        </>
    );
}
