import React from "react";
import styles from "./Filter.module";
import Icon from "./Icon";

export default function Filter() {
    return (
        <button className={styles.filter}>
            <Icon icon="filter" height="24" width="24" />
            Filter
        </button>
    );
}
