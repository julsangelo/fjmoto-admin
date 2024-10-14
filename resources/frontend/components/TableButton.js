import React from "react";
import styles from "./TableButton.module";
import Icon from "./Icon.js";

export default function TableButton({ icon, height, width }) {
    return (
        <button className={styles.tableButton}>
            <Icon icon={icon} height={height} width={width} />
        </button>
    );
}
