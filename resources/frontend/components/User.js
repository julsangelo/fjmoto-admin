import React from "react";
import styles from "./User.module";

export default function User() {
    return (
        <div className={styles.userContainer}>
            <div className={styles.userName}>Jane Doe</div>
        </div>
    );
}
