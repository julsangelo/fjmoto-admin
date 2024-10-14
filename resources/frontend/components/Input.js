import React from "react";
import styles from "./Input.module";
import Icon from "./Icon";

export default function Input({ label, icon, height, width }) {
    return (
        <div className={styles.inputContainer}>
            <Icon icon={icon} height={height} width={width} />
            <input className={styles.input} placeholder={label} />
        </div>
    );
}
