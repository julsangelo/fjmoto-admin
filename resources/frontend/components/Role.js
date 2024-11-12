import React from "react";
import styles from "./Role.module";

export default function Role({ data }) {
    return <div className={styles.role}>{data?.user?.employeePosition}</div>;
}
