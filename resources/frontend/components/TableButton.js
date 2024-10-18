import React from "react";
import styles from "./TableButton.module";
import Icon from "./Icon.js";

export default function TableButton({ icon, size }) {
    return (
        <button className={styles.tableButton}>
            <Icon icon={icon} size={size} />
        </button>
    );
}
