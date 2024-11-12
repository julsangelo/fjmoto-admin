import React from "react";
import styles from "./User.module";

export default function User({ data }) {
    return (
        <div className={styles.userContainer}>
            <div className={styles.userName}>
                {data?.user?.employeeFirstName} {data?.user?.employeeLastName}
            </div>
        </div>
    );
}
