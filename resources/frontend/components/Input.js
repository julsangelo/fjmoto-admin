import React from "react";
import styles from "./Input.module";
import Icon from "./Icon";

export default function Input({
    label,
    icon = null,
    size = null,
    value,
    onChange,
    placeholder,
}) {
    return (
        <div>
            <div className={styles.inputLabel}>{label}</div>
            <div className={styles.inputContainer}>
                {icon && <Icon icon={icon} size={size} />}
                <input
                    className={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
