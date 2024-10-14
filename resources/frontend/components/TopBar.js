import React from "react";
import styles from "./TopBar.module";

export default function TopBar({ children }) {
    return <div className={styles.topBar}>{children}</div>;
}
