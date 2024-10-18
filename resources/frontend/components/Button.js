import React from "react";
import styles from "./Button.module";
import Icon from "./Icon";

export default function Button({
    label,
    icon = null,
    size = null,
    onClick,
    className,
}) {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick}>
            {icon && <Icon icon={icon} size={size} />}
            {label}
        </button>
    );
}
