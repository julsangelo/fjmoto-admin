import React from "react";
import styles from "./Filter.module";
import Icon from "./Icon";

export default function Filter() {
    return (
        <button className={styles.filter}>
            <Icon icon="filter" size="24" />
            Filter
        </button>
    );
}
