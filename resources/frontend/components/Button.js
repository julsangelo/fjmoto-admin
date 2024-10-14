import React from "react";
import styles from "./Button.module";
import Icon from "./Icon";

export default function Button({ label }) {
    return (
        <button className={styles.button}>
            <Icon icon="add" height="24" width="24" />
            {label}
        </button>
    );
}
