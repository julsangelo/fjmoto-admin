import React from "react";
import styles from "./BarLink.module";
import Icon from "./Icon";

export default function BarLink({ label, icon, size, onClick, isActive }) {
    return (
        <div
            onClick={onClick}
            className={`${styles.barLink} ${isActive ? styles.barLinkActive : ""}`}
        >
            <Icon icon={icon} size={size} />
            {label}
        </div>
    );
}
