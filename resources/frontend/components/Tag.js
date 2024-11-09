import React from "react";
import styles from "./Tag.module";
import Icon from "./Icon";
export default function Tag({ text }) {
    return (
        <div className={styles.tag}>
            <Icon icon="bullet" size="6" />
            {text}
        </div>
    );
}
