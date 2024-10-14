import React from "react";
import styles from "./BarLink.module";
import Icon from "./Icon";

export default function BarLink({ label, icon, height, width }) {
    return (
        <div className={styles.barLink}>
            <Icon icon={icon} height={height} width={width} />
            {label}
        </div>
    );
}
