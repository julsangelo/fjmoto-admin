import React from "react";
import styles from "./DashboardLink.module";

export default function DashboardLink({ label }) {
    return <div className={styles.dashboardLink}>{label}</div>;
}
